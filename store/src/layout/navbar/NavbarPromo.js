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
      <div className="hidden lg:block xl:block bg-gray-100 border-b text-sm text-black">
        <div
          className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-10 flex justify-between items-center whitespace-nowrap overflow-x-auto no-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx>{`
            /* Hide scrollbar for Chrome, Safari and Opera */
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }

            /* Prevent wrapping between 768px–1280px */
            @media (max-width: 1280px) and (min-width: 768px) {
              .no-scrollbar {
                flex-wrap: nowrap !important;
              }
            }
          `}</style>

          <div>
            <Link
              onClick={() => setIsLoading(!isLoading)}
              href="/"
              className="mx-4 py-2 hover:text-emerald-600"
            >
              Home
            </Link>
          </div>

          <div>
            {storeCustomizationSetting?.home?.quick_delivery_subtitle?.en && (
              <Link
                onClick={() => setIsLoading(!isLoading)}
                href="/search?query=latest"
              >
                <div className="mx-4 py-2 hover:text-emerald-600">
                  {
                    storeCustomizationSetting?.home?.quick_delivery_subtitle
                      ?.en
                  }
                </div>
              </Link>
            )}
          </div>

          {data[0]?.children?.slice(0, 6)?.map((category, index) => (
            <div
              key={index}
              className="relative cursor-pointer group py-2"
              onClick={() =>
                handleSubCategory(
                  category?._id,
                  showingTranslateValue(category?.name)
                )
              }
            >
              <div className="mx-4 group hover:text-emerald-600 flex items-center space-x-2">
                <div>{capitalizeWords(category?.name?.en)}</div>
                {category?.children && (
                  <div className="group-hover:rotate-180 duration-200 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {category?.children && (
                <div className="absolute left-0 w-60 top-full hidden group-hover:block shadow-lg">
                  <div
                    className="absolute left-0 w-auto top-full rounded-md hidden group-hover:block bg-cyan-500 text-white shadow-lg p-4 gap-y-2 gap-x-6"
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${Math.ceil(
                        category.children.length / 8
                      )}, auto)`,
                    }}
                  >
                    {category?.children?.map((subCategory, subIndex) => (
                      <div className="border-b" key={subIndex}>
                        <div
                          className="block px-1 text-sm cursor-pointer py-1 hover:translate-x-1.5 duration-100 whitespace-nowrap"
                          onClick={(event) => {
                            event.stopPropagation();
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

          <div>
            <Link onClick={() => setIsLoading(!isLoading)} href="/contact-us">
              <div className="mx-4 py-2 hover:text-emerald-600">Buy In Bulk</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarPromo;
