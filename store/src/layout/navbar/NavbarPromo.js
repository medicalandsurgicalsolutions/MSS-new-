import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import SettingServices from "@services/SettingServices";
import Cookies from "js-cookie";
import { notifyError } from "@utils/toast";
import useGetSetting from "@hooks/useGetSetting";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import useAsync from "@hooks/useAsync";
import CategoryServices from "@services/CategoryServices";
import { useRouter } from "next/router";

const NavbarPromo = () => {
  const [languages, setLanguages] = useState([]);
  const { lang, storeCustomizationSetting } = useGetSetting();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const router = useRouter();
  const { showingTranslateValue } = useUtilsFunction();
  const currentLanguage = Cookies.get("_curr_lang") || null;
  const { data = [] } = useAsync(() => CategoryServices.getShowingCategory());

  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleSubNestedCategory = (id, categoryName) => {
    router.push(
      `/search?category=${categoryName
        .toLowerCase()
        .replace(/[^A-Z0-9]+/gi, "-")}&_id=${id}`
    );
    setIsLoading(!isLoading);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await SettingServices.getShowingLanguage();
        setLanguages(res);
      } catch (err) {
        notifyError(err);
      }
    })();
  }, []);

  const capitalizeWords = (string) =>
    string?.toLowerCase()?.replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <>
      <div className="hidden lg:block xl:block bg-gray-100 border-b text-sm text-black">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-8 relative">
          <div className="flex items-center justify-center flex-nowrap text-sm sm:text-[13px] md:text-[8px] lg:text-[12px] xl:text-[14px]">

            <Link
              href="/"
              onClick={() => setIsLoading(!isLoading)}
              className="mx-4 py-2 font-medium text-gray-800 relative group hover:text-emerald-600"
            >
              Home
            </Link>

            {storeCustomizationSetting?.home?.quick_delivery_subtitle?.en && (
              <Link
                href="/search?query=latest"
                onClick={() => setIsLoading(!isLoading)}
                className="mx-4 py-2 font-medium text-gray-800 relative group hover:text-emerald-600"
              >
                {storeCustomizationSetting?.home?.quick_delivery_subtitle?.en}
              </Link>
            )}

            {/* CATEGORY LOOP */}
            {data?.[0]?.children?.slice(0, 6)?.map((category, index) => (
              <div
                key={index}
                className="relative group py-2 cursor-pointer"
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="mx-4 hover:text-emerald-600 flex items-center space-x-2">
                  <div className="font-medium">
                    {capitalizeWords(category?.name?.en)}
                  </div>

                  {category?.children && (
                    <div className="group-hover:rotate-180 duration-200 py-2">
                      ▼
                    </div>
                  )}
                </div>

                {/* ⬇️ DROPDOWN (CATEGORY KE NICHE SHOW HOTAA HAI) */}
                {hoveredCategory === index &&
                  category?.children?.length > 0 && (
                    <div className="
                      absolute left-0 top-full mt-2
                      bg-cyan-500/95 text-white shadow-xl border
                      rounded-md p-4 z-[9999] w-max
                    ">
                      <div
                        className="grid gap-y-2 gap-x-6"
                        style={{
                          gridTemplateColumns: `repeat(${Math.ceil(
                            category.children.length / 8
                          )}, auto)`
                        }}
                      >
                        {category.children.map((subCategory, subIndex) => (
                          <div
                            className="border-b border-white/30"
                            key={subIndex}
                          >
                            <div
                              className="block px-1 text-sm font-semibold cursor-pointer py-1 whitespace-nowrap
                              transition-all duration-200 hover:text-yellow-300 hover:translate-x-1.5"
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

            <Link
              href="/medicine"
              onClick={() => setIsLoading(!isLoading)}
              className="mx-4 py-2 font-medium text-gray-800 relative group hover:text-emerald-600"
            >
              Medicines
            </Link>

            <Link
              href="/contact-us"
              onClick={() => setIsLoading(!isLoading)}
              className="mx-4 py-2 font-medium text-gray-800 relative group hover:text-emerald-600"
            >
              Buy In Bulk
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarPromo;
