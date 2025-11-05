import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart, FiUser, FiPhoneCall } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";
import logo from "../../../public/logo/logo-color.png";

// internal imports
import { getUserSession } from "@lib/auth";
import useGetSetting from "@hooks/useGetSetting";
import { handleLogEvent } from "src/lib/analytics";
import NavbarPromo from "@layout/navbar/NavbarPromo";
import CartDrawer from "@components/drawer/CartDrawer";
import { SidebarContext } from "@context/SidebarContext";
import ProductServices from "@services/ProductServices";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Navbar = () => {
  const { t } = useTranslation();
  const { showingTranslateValue } = useUtilsFunction();
  const [searchText, setSearchText] = useState("");
  const { toggleCartDrawer } = useContext(SidebarContext);
  const { totalItems } = useCart();
  const router = useRouter();

  const userInfo = getUserSession();
  const { storeCustomizationSetting } = useGetSetting();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const debounceTimeoutRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const searchTerm = useCallback((data, isSubmit = false) => {
    setSearchText(data);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }

    if (isSubmit) return;

    debounceTimeoutRef.current = setTimeout(async () => {
      if (data.trim() !== "") {
        try {
          const response = await ProductServices.productSuggest({ data });
          setFilteredProducts(response?.products);
        } catch (error) {
          console.error("Error fetching product suggestions:", error);
        }
      } else {
        setFilteredProducts([]);
      }
    }, 500);
  }, []);

  const handleClickOutside = (e) => {
    if (
      inputRef.current &&
      dropdownRef.current &&
      !inputRef.current.contains(e.target) &&
      !dropdownRef.current.contains(e.target)
    ) {
      setFilteredProducts([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e, slug) => {
    if (e) e.preventDefault();
    searchTerm("", true);

    if (slug) {
      router.push(`/product/${slug}`, null, { scroll: false });
      setSearchText("");
      setFilteredProducts([]);
      handleLogEvent("search", `searched ${slug}`);
    } else if (searchText) {
      router.push(`/search?query=${searchText}`, null, { scroll: false });
      setSearchText("");
      setFilteredProducts([]);
      handleLogEvent("search", `searched ${searchText}`);
    } else {
      router.push(`/`, null, { scroll: false });
      setSearchText("");
      setFilteredProducts([]);
    }
  };

  const handleSuggestionClick = (title) => {
    setSearchText(title);
    setFilteredProducts([]);
    handleSubmit(null, title);
  };

  return (
    <>
      <CartDrawer />
      <div className="bg-cyan-500 sticky top-0 z-20 pt-30">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="top-bar h-16 lg:h-auto flex items-center justify-between mx-auto">
            {/* Logo */}
            <Link
              href="/"
              className="mr-3 lg:mr-12 xl:mr-12 hidden md:hidden lg:block"
            >
              <div className="relative w-32 h-16">
                <Image
                  src={storeCustomizationSetting?.navbar?.logo || logo}
                  alt="Company Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Search Bar + Contact Info */}
            <div className="w-full py-4 lg:flex items-center justify-center gap-6">
              {/* Search Bar */}
              <div className="flex flex-col justify-center relative w-full max-w-[550px]">
                <form
                  onSubmit={handleSubmit}
                  className="relative pr-12 bg-white overflow-hidden shadow-sm rounded-md w-full"
                >
                  <label className="flex items-center">
                    <input
                      ref={inputRef}
                      onChange={(e) => searchTerm(e.target.value)}
                      value={searchText}
                      className="form-input w-full pl-5 text-sm h-10 bg-white outline-none border-none placeholder-gray-500 placeholder-opacity-75"
                      placeholder={t(`common:search-placeholder`)}
                    />
                  </label>
                  <button
                    aria-label="Search"
                    type="submit"
                    className="absolute top-0 right-0 w-12 h-full flex items-center justify-center text-xl text-gray-400 hover:text-cyan-600"
                  >
                    <IoSearchOutline />
                  </button>
                </form>

                {filteredProducts?.length > 0 && (
                  <ul
                    ref={dropdownRef}
                    className="absolute w-full bg-white shadow-md rounded-md mt-12 max-h-60 overflow-y-auto z-20"
                  >
                    {filteredProducts.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(item?.slug)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {item?.title?.en}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Phone Info Section */}
              <div className="hidden lg:flex items-center text-white font-small">
                <FiPhoneCall className="mr-2 text-white" />
                {showingTranslateValue(
                  storeCustomizationSetting?.navbar?.help_text
                )}
                <a
                  href={`tel:${
                    storeCustomizationSetting?.navbar?.phone || "+099949343"
                  }`}
                  className="font-bold text-white ml-1 underline hover:text-gray-200"
                >
                  {storeCustomizationSetting?.navbar?.phone || "+099949343"}
                </a>
              </div>
            </div>

            {/* Right Section (Cart + User) */}
            <div className="hidden md:hidden lg:flex items-center">
              <button
                aria-label="Total"
                onClick={toggleCartDrawer}
                className="relative px-5 text-white text-2xl"
              >
                <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {totalItems}
                </span>
                <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
              </button>

              <button className="pl-5 text-white text-2xl" aria-label="Login">
                {userInfo?.image ? (
                  <Link href="/user/dashboard" className="relative w-6 h-6">
                    <Image
                      width={29}
                      height={29}
                      src={userInfo?.image}
                      alt="user"
                      className="bg-white rounded-full"
                    />
                  </Link>
                ) : userInfo?.phone ? (
                  <Link href="/user/dashboard">
                    <FiUser className="w-6 h-6 drop-shadow-xl" />
                  </Link>
                ) : (
                  <Link href="/auth/login">
                    <FiUser className="w-6 h-6 drop-shadow-xl" />
                  </Link>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Second Header */}
        <NavbarPromo />
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
