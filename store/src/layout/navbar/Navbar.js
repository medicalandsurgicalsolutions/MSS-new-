import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart, FiUser, FiBell } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";
import logo from  "../../../public/logo/logo-color.png";

//internal import
import { getUserSession } from "@lib/auth";
import useGetSetting from "@hooks/useGetSetting";
import { handleLogEvent } from "src/lib/analytics";
import NavbarPromo from "@layout/navbar/NavbarPromo";
import CartDrawer from "@components/drawer/CartDrawer";
import { SidebarContext } from "@context/SidebarContext";
import ProductServices from "@services/ProductServices";

const Navbar = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const { toggleCartDrawer } = useContext(SidebarContext);
  const { totalItems } = useCart();
  const router = useRouter();

  const userInfo = getUserSession();

  const { storeCustomizationSetting } = useGetSetting();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredRefrence, setFilteredRefrence] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if submitting
  const debounceTimeoutRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const searchTerm = useCallback((data, isSubmit = false) => {
    setSearchText(data);

    // Clear the previous timer
    if(debounceTimeoutRef.current){
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }

    if(isSubmit) return;

    // Set a new timer for 2 seconds
    debounceTimeoutRef.current = setTimeout(async () => {
      if (data.trim() !== "") {
        try {
          // console.log("Making API call with:", data); // 
          // Call the API and await the response
          const response = await ProductServices.productSuggest({ data });
          setFilteredProducts(response?.products)
        } catch (error) {
          console.error("Error fetching product suggestions:", error);
        }
      }else{
        setFilteredProducts([]);
      }
    }, 500); // 0.5 second delay

    // setDebounceTimer(newTimer);
  }, [debounceTimer])

  const handleClickOutside = (e) => {
    // Check if click is outside both input and dropdown
    if (
      inputRef.current && 
      dropdownRef.current && 
      !inputRef.current.contains(e.target) &&
      !dropdownRef.current.contains(e.target)
    ) {
      setFilteredProducts([]); // Clear suggestions if click is outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e, slug) => {
    // Check if `e` exists before calling `preventDefault`
    if (e) {
      e.preventDefault();
    }

    searchTerm("", true);

    
    // return;
    if (slug) {
      router.push(`/product/${slug}`, null, { scroll: false });
      setSearchText("");
      setFilteredProducts([]);
      handleLogEvent("search", `searched ${slug}`);
    }
    else if(searchText){
      router.push(`/search?query=${searchText}`, null, { scroll: false });
      setSearchText("");
      setFilteredProducts([]);
      handleLogEvent("search", `searched ${searchText}`);
    } else {
      router.push(`/ `, null, { scroll: false });
      setSearchText("");
      setFilteredProducts([]);
    }
  };

  const handleSuggestionClick = (title) => {
    setSearchText(title);
    setFilteredProducts([]); // Clear suggestions after selection
  
    // Call handleSubmit with the title directly
    handleSubmit(null, title);
  };

  return (
    <>
      <CartDrawer />
      <div className="bg-cyan-500 sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="top-bar h-16 lg:h-auto flex items-center justify-between mx-auto">
            <Link
              href="/"
              className="mr-3 lg:mr-12 xl:mr-12 hidden md:hidden lg:block"
            >
              <div className="relative w-32 h-16">
                  <Image
                    src={ storeCustomizationSetting?.navbar?.logo || logo}
                    alt="Company Logo"
                    fill // Automatically adjusts the image size
                    className="object-contain" // Ensures the image fits within the div without distortion
                    priority
                  />
              </div>
            </Link>
                      
           <div className="w-full py-4 transition-all duration-200 ease-in-out lg:flex lg:max-w-[450px] xl:max-w-[650px] 2xl:max-w-[750px] md:mx-8 lg:mx-4 xl:mx-0">
              <div className="w-full flex flex-col justify-center flex-shrink-0 relative z-30">
                <div className="flex flex-col mx-auto w-full">
                  <form
                    onSubmit={handleSubmit}
                    className="relative pr-12 md:pr-14 bg-white overflow-hidden shadow-sm rounded-md w-full"
                  >
                    <label className="flex items-center py-0.5">
                      <input
                        ref={inputRef}
                        onChange={(e) => searchTerm(e.target.value)}
                        value={searchText}
                        className="form-input w-full pl-5 appearance-none transition ease-in-out border text-input text-sm font-sans rounded-md min-h-10 h-10 duration-200 bg-white focus:ring-0 outline-none border-none focus:outline-none placeholder-gray-500 placeholder-opacity-75"
                        placeholder={t(`common:search-placeholder`)}
                      />
                    </label>
                    <button
                      aria-label="Search"
                      type="submit"
                      className="outline-none text-xl text-gray-400 absolute top-0 right-0 end-0 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
                    >
                      <IoSearchOutline />
                    </button>
                  </form>
                  {/* Auto-suggestion dropdown */}
                  {filteredProducts?.length > 0 && (
                    <ul ref={dropdownRef} className="absolute w-full bg-white shadow-md rounded-md mt-12 max-h-60 overflow-y-auto z-20">
                      {filteredProducts?.map((item, index) => (
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
              </div>
            </div>
            <div className="hidden md:hidden md:items-center py-4 lg:flex xl:block absolute inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* <button
                className="pr-5 text-white text-2xl font-bold"
                aria-label="Alert"
              >
                <FiBell className="w-6 h-6 drop-shadow-xl" />
              </button> */}
              <button
                aria-label="Total"
                onClick={toggleCartDrawer}
                className="relative px-5 text-white text-2xl font-bold"
              >
                <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {totalItems}
                </span>
                <FiShoppingCart className="w-6 h-6 drop-shadow-xl" />
              </button>
              {/* Profile dropdown */}

              <button
                className="pl-5 text-white text-2xl font-bold"
                aria-label="Login"
              >
                {userInfo?.image ? (
                  <Link
                    href="/user/dashboard"
                    className="relative top-1 w-6 h-6"
                  >
                    <Image
                      width={29}
                      height={29}
                      src={userInfo?.image}
                      alt="user"
                      className="bg-white rounded-full"
                    />
                  </Link>
                ) : userInfo?.phone ? (
                  <Link
                    href="/user/dashboard"
                    className="leading-none font-bold  block"
                  >
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

        {/* second header */}
        <NavbarPromo />
      </div>
    </>
  );
};
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
