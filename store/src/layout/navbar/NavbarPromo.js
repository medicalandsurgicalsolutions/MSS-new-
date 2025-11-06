import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { SidebarContext } from "@context/SidebarContext";
import SettingServices from "@services/SettingServices";
import CategoryServices from "@services/CategoryServices";
import Cookies from "js-cookie";
import { notifyError } from "@utils/toast";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getUserSession } from "@lib/auth";
import useAsync from "@hooks/useAsync";
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
      {/* ✅ Navbar Section */}
      <div className="bg-gray-100 border-b text-sm text-black">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-start flex-nowrap overflow-x-auto scrollbar-hide">
          {/* Home Link */}
          <Link
            onClick={() => setIsLoading(!isLoading)}
            href="/"
            className="py-3 px-3 hover:text-emerald-600 whitespace-nowrap"
          >
            Home
          </Link>

          {/* New Arrivals */}
          {storeCustomizationSetting?.home?.quick_delivery_subtitle?.en && (
            <Link
              onClick={() => setIsLoading(!isLoading)}
              href="/search?query=latest"
              className="py-3 px-3 hover:text-emerald-600 whitespace-nowrap"
            >
              {storeCustomizationSetting?.home?.quick_delivery_subtitle?.en}
            </Link>
          )}

          {/* Category Links */}
          {data[0]?.children?.slice(0, 6)?.map((category, index) => (
            <div
              key={index}
              className="relative cursor-pointer group py-3 px-3 whitespace-nowrap"
              onClick={() =>
                handleSubCategory(
                  category?._id,
                  showingTranslateValue(category?.name)
                )
              }
            >
              <div className="flex items-center space-x-1 hover:text-emerald-600">
                <span>{capitalizeWords(category?.name?.en)}</span>
                {category?.children && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </div>

              {/* Dropdown Menu */}
              {category?.children && (
                <div className="absolute left-0 top-full hidden group-hover:block shadow-lg">
                  <div
                    className="bg-cyan-500 text-white shadow-lg p-4 grid gap-2 rounded-md"
                    style={{
                      gridTemplateColumns: `repeat(${Math.ceil(
                        category.children.length / 8
                      )}, auto)`,
                    }}
                  >
                    {category.children.map((sub, i) => (
                      <div
                        key={i}
                        className="text-sm cursor-pointer py-1 hover:translate-x-1.5 duration-100 whitespace-nowrap"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubNestedCategory(
                            sub?._id,
                            showingTranslateValue(sub?.name)
                          );
                        }}
                      >
                        {sub?.name?.en}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Buy In Bulk */}
          <Link
            onClick={() => setIsLoading(!isLoading)}
            href="/contact-us"
            className="py-3 px-3 hover:text-emerald-600 whitespace-nowrap"
          >
            Buy In Bulk
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavbarPromo;
