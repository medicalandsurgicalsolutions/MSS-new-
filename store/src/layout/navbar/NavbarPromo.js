import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
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
  const { lang, storeCustomizationSetting } = useGetSetting();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const router = useRouter();
  const { showingTranslateValue } = useUtilsFunction();
  const currentLanguage = Cookies.get("_curr_lang") || null;
  const { data } = useAsync(() => CategoryServices.getShowingCategory());

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState({});

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

  const handleMouseEnter = (index, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredCategory(index);
    setDropdownStyle({
      position: "absolute",
      top: rect.bottom + window.scrollY + "px",
      left: rect.left + "px",
      minWidth: rect.width + "px",
      width: "auto",
    });
  };

  const handleMouseLeave = () => setHoveredCategory(null);

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
            {data[0]?.children?.slice(0, 6)?.map((category, index) => (
              <div
                key={index}
                className="relative cursor-pointer group py-2"
                onMouseEnter={(e) => handleMouseEnter(index, e)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="mx-4 hover:text-emerald-600 flex items-center space-x-2 relative">
                  <div className="font-medium relative">
                    {capitalizeWords(category?.name?.en)}
                  </div>

                {category?.children?.length > 0 && (
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

      {/* DROPDOWN RENDER */}
      {hoveredCategory !== null &&
        data[0]?.children?.[hoveredCategory]?.children &&
        createPortal(
          <div
            style={dropdownStyle}
            className="bg-cyan-500/95 text-white shadow-lg p-4 gap-y-2 gap-x-6 z-[9999] rounded-md inline-block"
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.ceil(
                  data[0].children[hoveredCategory].children.length / 8
                )}, auto)`,
              }}
            >
              {data[0].children[hoveredCategory].children.map(
                (subCategory, subIndex) => (
                  <div className="border-b border-white/30" key={subIndex}>
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
                )
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default NavbarPromo;
