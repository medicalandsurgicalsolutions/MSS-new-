import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import Drawer from "rc-drawer";
import Link from "next/link";
import Image from "next/image";
import { IoChevronDown, IoChevronUp, IoClose } from "react-icons/io5";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import useAsync from "@hooks/useAsync";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import CategoryServices from "@services/CategoryServices";
import DepartmentServices from "@services/DepartmentServices";
import CategoryCard from "@components/category/CategoryCard";
import { SidebarContext } from "@context/SidebarContext";
import DUMMY_IMAGE from "@components/constants";
import { getUserSession } from "@lib/auth";

const CategoryDrawer = () => {
  const { categoryDrawerOpen, closeCategoryDrawer, setIsLoading, isLoading } =
    useContext(SidebarContext);

  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  const userInfo = getUserSession();
  const router = useRouter();

  const handleLogOut = () => {
    signOut();
    Cookies.remove("couponInfo");
    router.push("/");
  };

  const { data } = useAsync(() => CategoryServices.getShowingCategory());
  const { data: departments } = useAsync(() =>
    DepartmentServices.getCategoriesFromDepartments()
  );

  const [dropdownOpen, setDropdownOpen] = useState({
    department: false,
    category: false,
  });

  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleLinkClick = (url) => {
    closeCategoryDrawer();
    router.push(url);
  };

  return (
    <Drawer
      open={categoryDrawerOpen}
      onClose={closeCategoryDrawer}
      parent={null}
      level={null}
      placement={"left"}
    >
      <div className="category-drawer flex flex-col w-full h-full bg-white cursor-pointer scrollbar-hide">
        {/* Header */}
        <div className="w-full flex justify-between items-center h-16 px-6 py-4 bg-cyan-500 text-white border-b border-gray-100">
          <h2 className="font-semibold text-lg m-0 text-heading flex align-center">
            <Link href="/" className="mr-10">
              <Image
                width={50}
                height={38}
                src={storeCustomizationSetting?.navbar?.logo || DUMMY_IMAGE}
                alt="logo"
              />
            </Link>
          </h2>
          <button
            onClick={closeCategoryDrawer}
            className="flex text-xl items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-red-500 p-2 focus:outline-none transition-opacity hover:text-red-600"
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow w-full overflow-y-auto m-4">
          <div className="flex-grow w-full mb-4">
            <Link
              onClick={() => {
                setIsLoading(!isLoading);
                closeCategoryDrawer();
              }}
              href="/"
              className="w-full text-start font-bold transition-all focus:outline-none whitespace-nowrap"
            >
              Home
            </Link>
            <hr />

            {storeCustomizationSetting?.navbar?.categories_menu_status && (
              <div className="my-3">
                <button
                  onClick={() => toggleDropdown("category")}
                  className="w-full text-start font-bold transition-all focus:outline-none whitespace-nowrap"
                >
                  {showingTranslateValue(
                    storeCustomizationSetting?.navbar?.categories
                  )}
                </button>
                {dropdownOpen.category &&
                  data[0]?.children?.map((category) => (
                    <CategoryCard
                      key={category._id}
                      id={category._id}
                      icon={category.icon}
                      nested={category.children}
                      title={showingTranslateValue(category?.name)}
                    />
                  ))}
              </div>
            )}
            <hr />

            {/* Links Column */}
            <div className="w-full flex flex-col gap-3 mt-3 links-column">
              <Link
                onClick={() => {
                  setIsLoading(!isLoading);
                  closeCategoryDrawer();
                }}
                href="/search"
                className="w-full text-start font-bold transition-all focus:outline-none whitespace-nowrap"
              >
                Products
              </Link>
              <hr />
              <Link
                onClick={() => {
                  setIsLoading(!isLoading);
                  closeCategoryDrawer();
                }}
                href="/search?query=latest"
                className="w-full text-start font-bold transition-all focus:outline-none whitespace-nowrap"
              >
                New Products Edition
              </Link>
              <hr />
              <Link
                onClick={() => {
                  setIsLoading(!isLoading);
                  closeCategoryDrawer();
                }}
                href={`${storeCustomizationSetting?.home?.promotion_button_link}`}
                className="w-full text-start font-bold transition-all focus:outline-none whitespace-nowrap"
              >
                {showingTranslateValue(
                  storeCustomizationSetting?.home?.promotion_title
                )}
              </Link>

              {userInfo &&
                storeCustomizationSetting?.navbar?.offers_menu_status && (
                  <>
                    <Link
                      onClick={() => {
                        setIsLoading(!isLoading);
                        closeCategoryDrawer();
                      }}
                      href="/offer"
                      className="w-full text-start font-bold transition-all focus:outline-none whitespace-nowrap"
                    >
                      <span className="bg-emerald-300 text-white rounded-md px-4 py-1 whitespace-nowrap">
                        {showingTranslateValue(
                          storeCustomizationSetting?.navbar?.offers
                        )}
                      </span>
                    </Link>
                  </>
                )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full px-4 py-3 border-t border-gray-200 text-center">
          {userInfo?.email ? (
            <button
              onClick={handleLogOut}
              className="w-full px-8 text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-600 transition-all focus:outline-none whitespace-nowrap"
            >
              {showingTranslateValue(storeCustomizationSetting?.navbar?.logout)}
            </button>
          ) : (
            <button
              className="w-full px-8 text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-600 transition-all focus:outline-none whitespace-nowrap"
              onClick={(e) => handleLinkClick("/auth/login")}
            >
              {showingTranslateValue(storeCustomizationSetting?.navbar?.login)}
            </button>
          )}
        </div>

        {/* ✅ Scoped Styles */}
        <style jsx>{`
          @media (max-width: 1200px) {
            .category-drawer .links-column {
              gap: 10px;
            }
            .category-drawer :global(.lg\\:px-10) {
              padding-left: 1rem !important;
              padding-right: 1rem !important;
            }
            .category-drawer :global(.mx-4) {
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
          }
        `}</style>
      </div>
    </Drawer>
  );
};

export default dynamic(() => Promise.resolve(CategoryDrawer), { ssr: false });
