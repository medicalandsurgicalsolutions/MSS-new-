import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import SettingServices from "@services/SettingServices";
import Cookies from "js-cookie";
import { notifyError } from "@utils/toast";
import useGetSetting from "@hooks/useGetSetting";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { useRouter } from "next/router";
import useAsync from "@hooks/useAsync";
import CategoryServices from "@services/CategoryServices";

const NavbarPromo = () => {
  const [languages, setLanguages] = useState([]);
  const { lang, storeCustomizationSetting } = useGetSetting();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const router = useRouter();
  const { showingTranslateValue } = useUtilsFunction();
  const currentLanguage = Cookies.get("_curr_lang") || null;
  const { data = [] } = useAsync(() => CategoryServices.getShowingCategory());

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

  const handleMouseEnter = (index, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredCategory(index);
    setDropdownStyle({
      position: "absolute",
      top: rect.bottom + window.scrollY + "px",
      left: rect.left + "px",
      minWidth: rect.width + "px",
      width: "auto",
      zIndex: 9999,
    });
  };

  const handleMouseLeave = () => setHoveredCategory(null);

  return (
    <div className="hidden lg:block xl:block bg-gray-100 border-b text-sm text-black">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-8 relative">
        <div className="flex items-center justify-center flex-nowrap text-sm sm:text-[13px] md:text-[8px] lg:text-[12px] xl:text-[14px]">

          {/* Home */}
          <Link
            href="/"
            onClick={() => setIsLoading(!isLoading)}
            className="mx-4 py-2 font-medium text-gray-800 relative group hover:text-emerald-600 snap-start"
          >
            <span className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-emerald-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 group-hover:after:w-full">
              Home
            </span>
          </Link>

          {/* Subtitle */}
          {storeCustomizationSetting?.home?.quick_delivery_subtitle?.en && (
            <Link
              href="/search?query=latest"
              onClick={() => setIsLoading(!isLoading)}
              className="mx-4 py-2 font-medium text-gray-800 relative group hover:text-emerald-600"
            >
              <span className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-emerald-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 group-hover:after:w-full">
                {storeCustomizationSetting?.home?.quick_delivery_subtitle?.en}
              </span>
            </Link>
          )}

          {/* Categories */}
        {data?.[0]?.children?.slice(0, 6)?.map((category, index) => (
  <div
    key={index}
    className="relative group py-2"
    onMouseEnter={() => setHoveredCategory(index)}
    onMouseLeave={() => setHoveredCategory(null)}
  >
    {/* category title */}
    <div
      className="mx-4 hover:text-emerald-600 flex items-center space-x-2 cursor-pointer"
      onClick={() =>
        handleSubCategory(category?._id, showingTranslateValue(category?.name))
      }
    >
      <div className="font-medium">
        {capitalizeWords(category?.name?.en)}
      </div>

      {category?.children?.length > 0 && (
        <div className="group-hover:rotate-180 duration-200 py-2">
          ▼
        </div>
      )}
    </div>

    {/* 🔥 Dropdown directly below category */}
    {hoveredCategory === index && category?.children?.length > 0 && (
      <div className="absolute left-0 top-full bg-white shadow-lg border rounded-md p-3 w-max z-50">
        {category.children.map((sub) => (
          <div
            key={sub._id}
            className="py-1 px-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
            onClick={() =>
              handleSubCategory(sub?._id, showingTranslateValue(sub?.name))
            }
          >
            {capitalizeWords(sub?.name?.en)}
          </div>
        ))}
      </div>
    )}
  </div>
))}


          {/* Medicines */}
          <Link
            href="/medicine"
            onClick={() => setIsLoading(!isLoading)}
            className="mx-4 py-2 font-medium text-gray-800 relative group hover:text-emerald-600"
          >
            <span className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-emerald-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 group-hover:after:w-full">
              Medicines
            </span>
          </Link>

          {/* Buy in Bulk */}
          <Link
            href="/contact-us"
            onClick={() => setIsLoading(!isLoading)}
            className="mx-4 py-2 font-medium text-gray-800 relative group hover:text-emerald-600"
          >
            <span className="relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-emerald-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 group-hover:after:w-full">
              Buy In Bulk
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default NavbarPromo;
