import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
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
  const { data } = useAsync(() => CategoryServices.getShowingCategory());

  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [dropdownStyle, setDropdownStyle] = useState({});

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
      } catch (err) {
        notifyError(err);
      }
    })();
  }, []);

  const capitalizeWords = (string) => {
    return string?.toLowerCase()?.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleMouseEnter = (index, e, category) => {
    // 🚫 Medicine category => NO DROPDOWN
    if (category?.name?.en?.toLowerCase() === "medicines" ||
        category?.name?.en?.toLowerCase() === "medicine") 
    {
      setHoveredCategory(null);
      return;
    }

    // ✅ other categories dropdown normal
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

            {/* HOME */}
            <Link
              href="/"
              onClick={() => setIsLoading(!isLoading)}
              className="mx-4 py-2 font-medium text-gray-800 relative group hover:text-emerald-600 snap-start"
            >
              <span className="relative after:content-[''] after:absolute after:w-0 
              after:h-[2px] after:bg-emerald-600 after:left-0 after:-bottom-1 
              after:transition-all after:duration-300 group-hover:after:w-full">
                Home
              </span>
            </Link>

            {/* SUBTITLE - NEW ARRIVALS */}
            {storeCustomizationSetting?.home?.quick_delivery_subtitle?.en && (
              <Link
                href="/search?query=latest"
                onClick={() => setIsLoading(!isLoading)}
                className="mx-4 py-2 font-medium text-gray-800 relative group hover:text-emerald-600"
              >
                <span className="relative after:content-[''] after:absolute after:w-0 
                after:h-[2px] after:bg-emerald-600 after:left-0 after:-bottom-1 
                after:transition-all after:duration-300 group-hover:after:w-full">
                  {storeCustomizationSetting?.home?.quick_delivery_subtitle?.en}
                </span>
              </Link>
            )}

            {/* CATEGORIES */}
            {data[0]?.children?.slice(0, 6)?.map((category, index) => (
              <div
                key={index}
                className="relative cursor-pointer group py-2"
                onMouseEnter={(e) => handleMouseEnter(index, e, category)}
                onMouseLeave={handleMouseLeave}
                onClick={() =>
                  handleSubCategory(
                    category?._id,
                    showingTranslateValue(category?.name)
                  )
                }
              >
                <div className="mx-4 hover:text-emerald-600 flex items-center space-x-2 relative">

                  {/* category name */}
                  <div className="font-medium relative after:content-[''] after:absolute 
                    after:w-0 after:h-[2px] after:bg-emerald-600 after:left-0 
                    after:-bottom-1 after:transition-all after:duration-300 group-hover:after:w-full">
                    {capitalizeWords(category?.name?.en)}
                  </div>

                  {/* dropdown icon — hidden for Medicines */}
                  {category?.name?.en?.toLowerCase() !== "medicines" &&
                   category?.name?.en?.toLowerCase() !== "medicine" &&
                   category?.children && (
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

            {/* MEDICINE (STATIC LINK) */}
            <Link
              href="/medicine"
              onClick={() => setIsLoading(!isLoading)}
              className="mx-4 py-2 font-medium text-gray-800 relative group hover:text-emerald-600"
            >
              <span className="relative after:content-[''] after:absolute after:w-0 
              after:h-[2px] after:bg-emerald-600 after:left-0 after:-bottom-1 
              after:transition-all after:duration-300 group-hover:after:w-full">
                Medicines
              </span>
            </Link>

            {/* BUY IN BULK */}
            <Link
              href="/contact-us"
              onClick={() => setIsLoading(!isLoading)}
              className="mx-4 py-2 font-medium text-gray-800 relative group hover:text-emerald-600"
            >
              <span className="relative after:content-[''] after:absolute after:w-0 
              after:h-[2px] after:bg-emerald-600 after:left-0 after:-bottom-1 
              after:transition-all after:duration-300 group-hover:after:w-full">
                Buy In Bulk
              </span>
            </Link>

          </div>
        </div>
      </div>

      {/* DROPDOWN FOR NON-MEDICINE ONLY */}
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
