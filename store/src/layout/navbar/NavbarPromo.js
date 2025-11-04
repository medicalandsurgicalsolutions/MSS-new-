import { Fragment, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Transition, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import SettingServices from "@services/SettingServices";
import Cookies from "js-cookie";

// internal imports
import { notifyError } from "@utils/toast";
import useGetSetting from "@hooks/useGetSetting";
import Category from "@components/category/Category";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getUserSession } from "@lib/auth";
import useAsync from "@hooks/useAsync";
import Image from "next/image";
import CategoryServices from "@services/CategoryServices";
import { useRouter } from "next/router";

const NavbarPromo = () => {
  const [languages, setLanguages] = useState([]);
  const { lang, storeCustomizationSetting } = useGetSetting();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const router = useRouter();

  const { showingTranslateValue } = useUtilsFunction();
  const currentLanguage = Cookies.get("_curr_lang") || null;

  const { data, loading, error } = useAsync(() =>
    CategoryServices.getShowingCategory()
  );

  let currentLang = {};

  if (currentLanguage && currentLanguage !== "undefined") {
    try {
      currentLang = JSON.parse(currentLanguage);
    } catch (error) {
      console.error("Invalid JSON format:", error);
      currentLang = {};
    }
  }

  const userInfo = getUserSession();

  const handleSubNestedCategory = (id, categoryName) => {
    const name = categoryName.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");
    router.push(`/search?category=${name}&_id=${id}`);
    setIsLoading(!isLoading);
  };

  const handleSubCategory = (id, categoryName) => {
    const name = categoryName.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");
    router.push(`/search?category=${name}&_id=${id}`);
    setIsLoading(!isLoading);
  };

  const handleLanguage = (lang) => {
    Cookies.set("_lang", lang?.iso_code, {
      sameSite: "None",
      secure: true,
    });
    Cookies.set("_curr_lang", JSON.stringify(lang), {
      sameSite: "None",
      secure: true,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await SettingServices.getShowingLanguage();
        setLanguages(res);
        const currentLanguage = Cookies.get("_curr_lang");
        if (!currentLanguage) {
          const result = res?.find((language) => language?.iso_code === lang);
          Cookies.set("_curr_lang", JSON.stringify(result || res[0]), {
            sameSite: "None",
            secure: true,
          });
        }
      } catch (err) {
        notifyError(err);
      }
    })();
  }, []);

  const capitalizeWords = (string) => {
    return string
      ?.toLowerCase()
      ?.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <>
     return (
  <>
    {/* Desktop Navbar */}
    <div className="hidden md:flex bg-gray-100 border-b text-sm text-black">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center flex-wrap">
        {/* Home */}
        <div>
          <Link
            onClick={() => setIsLoading(!isLoading)}
            href="/"
            className="mx-2 py-2 hover:text-emerald-600 block"
          >
            Home
          </Link>
        </div>

        {/* Quick Delivery */}
        {storeCustomizationSetting?.home?.quick_delivery_subtitle?.en && (
          <div>
            <Link
              onClick={() => setIsLoading(!isLoading)}
              href="/search?query=latest"
              className="mx-2 py-2 hover:text-emerald-600 block"
            >
              {
                storeCustomizationSetting?.home?.quick_delivery_subtitle
                  ?.en
              }
            </Link>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap justify-center">
          {data[0]?.children?.slice(0, 6)?.map((category, index) => (
            <div
              key={index}
              className="relative cursor-pointer group py-2 mx-2"
              onClick={() =>
                handleSubCategory(
                  category?._id,
                  showingTranslateValue(category?.name)
                )
              }
            >
              <div className="group hover:text-emerald-600 flex items-center space-x-1">
                <div className="text-sm font-medium">
                  {capitalizeWords(category?.name?.en)}
                </div>
                {category?.children && (
                  <div className="group-hover:rotate-180 duration-200">
                    <ChevronDownIcon className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Dropdown */}
              {category?.children && (
                <div className="absolute left-0 w-56 top-full hidden group-hover:block shadow-lg z-50">
                  <div
                    className="rounded-md bg-cyan-500 text-white shadow-lg p-3 grid gap-2"
                    style={{
                      gridTemplateColumns: `repeat(${Math.ceil(
                        category.children.length / 8
                      )}, auto)`,
                    }}
                  >
                    {category?.children?.map((subCategory, subIndex) => (
                      <div key={subIndex}>
                        <div
                          className="block text-sm cursor-pointer hover:translate-x-1 duration-100 whitespace-nowrap border-b border-cyan-400 pb-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubNestedCategory(
                              subCategory?._id,
                              showingTranslateValue(subCategory?.name)
                            );
                          }}
                        >
                          {subCategory?.name?.en}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Buy In Bulk */}
        <div>
          <Link
            onClick={() => setIsLoading(!isLoading)}
            href="/contact-us"
            className="mx-2 py-2 hover:text-emerald-600 block"
          >
            Buy In Bulk
          </Link>
        </div>
      </div>
    </div>

    {/* ✅ Mobile Navbar */}
    <div className="md:hidden bg-gray-100 border-b text-sm text-black">
      <div className="px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          onClick={() => setIsLoading(!isLoading)}
          className="text-emerald-700 font-semibold"
        >
          Home
        </Link>

        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button className="flex items-center text-sm font-medium focus:outline-none">
                Categories
                <ChevronDownIcon
                  className={`ml-1 h-4 w-4 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Popover.Button>

              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Popover.Panel className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
                  <div className="py-2">
                    {data[0]?.children?.slice(0, 6)?.map((category, i) => (
                      <div
                        key={i}
                        onClick={() =>
                          handleSubCategory(
                            category?._id,
                            showingTranslateValue(category?.name)
                          )
                        }
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {capitalizeWords(category?.name?.en)}
                      </div>
                    ))}
                    <Link
                      href="/contact-us"
                      onClick={() => setIsLoading(!isLoading)}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Buy In Bulk
                    </Link>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  </>
);

    </>
  );
};

export default NavbarPromo;
