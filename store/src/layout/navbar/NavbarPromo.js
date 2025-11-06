import { Fragment, useState, useEffect, useContext } from "react";
import Link from "next/link";
import SettingServices from "@services/SettingServices";
import Cookies from "js-cookie";
import { notifyError } from "@utils/toast";
import useGetSetting from "@hooks/useGetSetting";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getUserSession } from "@lib/auth";
import useAsync from "@hooks/useAsync";
import CategoryServices from "@services/CategoryServices";
import { useRouter } from "next/router";

const NavbarPromo = () => {
  const [languages, setLanguages] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const { lang, storeCustomizationSetting } = useGetSetting();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const router = useRouter();

  const { showingTranslateValue } = useUtilsFunction();
  const currentLanguage = Cookies.get("_curr_lang") || null;

  const { data } = useAsync(() => CategoryServices.getShowingCategory());
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

  const capitalizeWords = (string) =>
    string?.toLowerCase()?.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <>
      <div className="hidden lg:block xl:block bg-gray-100 border-b text-sm text-black relative">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* ✅ scrollable bar */}
          <div className="flex flex-nowrap items-center whitespace-nowrap overflow-x-auto scrollbar-hide w-full relative z-30">
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
                      storeCustomizationSetting?.home
                        ?.quick_delivery_subtitle?.en
                    }
                  </div>
                </Link>
              )}
            </div>

            {data[0]?.children?.slice(0, 6)?.map((category, index) => (
              <div
                key={index}
                className="relative cursor-pointer group py-2"
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() =>
                  handleSubCategory(
                    category?._id,
                    showingTranslateValue(category?.name)
                  )
                }
              >
                <div className="mx-4 group-hover:text-emerald-600 flex items-center space-x-2">
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
              </div>
            ))}

            <div>
              <Link
                onClick={() => setIsLoading(!isLoading)}
                href="/contact-us"
              >
                <div className="mx-4 py-2 hover:text-emerald-600">
                  Buy In Bulk
                </div>
              </Link>
            </div>
          </div>

          {/* ✅ dropdowns rendered outside scroll area */}
          {data[0]?.children?.slice(0, 6)?.map(
            (category, index) =>
              hoveredCategory === index &&
              category?.children && (
                <div
                  key={`dropdown-${index}`}
                  className="absolute left-0 top-full bg-cyan-500 text-white shadow-lg p-4 gap-y-2 gap-x-6 z-50 rounded-md"
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${Math.ceil(
                      category.children.length / 8
                    )}, auto)`,
                  }}
                  onMouseEnter={() => setHoveredCategory(index)}
                  onMouseLeave={() => setHoveredCategory(null)}
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
              )
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarPromo;
