import React, { Fragment, useContext, useState } from "react";
import dynamic from "next/dynamic";
import Drawer from "rc-drawer";

import Category from "@components/category/Category";
import { SidebarContext } from "@context/SidebarContext";
import { Popover, Transition } from "@headlessui/react";
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { getUserSession } from "@lib/auth";
import { FiUser } from "react-icons/fi";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { IoChevronDown, IoChevronUp, IoClose } from "react-icons/io5";
import Image from "next/image";
import CategoryServices from "@services/CategoryServices";
import DepartmentServices from "@services/DepartmentServices";
import useAsync from "@hooks/useAsync";
import CategoryCard from "@components/category/CategoryCard";
import DUMMY_IMAGE from "@components/constants";

const CategoryDrawer = () => {
  const { categoryDrawerOpen, closeCategoryDrawer, setIsLoading, isLoading } =
    useContext(SidebarContext);

    const { lang, storeCustomizationSetting } = useGetSetting();
    const { showingTranslateValue } = useUtilsFunction();
    const userInfo = getUserSession();
    const router = useRouter();
    


    const handleLogOut = () => {
      signOut();
      Cookies.remove("couponInfo");
      router.push("/");
    };


     
    const { data, loading, error } = useAsync(() =>
      CategoryServices.getShowingCategory()
    );

    const { data: departments } = useAsync(() =>
      DepartmentServices.getCategoriesFromDepartments()
    );

    const [dropdownOpen, setDropdownOpen] = useState({ department: false, category: false });
  
    const toggleDropdown = (dropdown) => {
      setDropdownOpen((prev) => ({
        ...prev,
        [dropdown]: !prev[dropdown],
      }));
    };
  
    const handleLinkClick = (url) => {
      closeCategoryDrawer(); // Close the drawer
      router.push(url); // Navigate to the clicked link's route
    };

    const [expanded, setExpanded] = useState({}); // Track expanded state for each department

    const toggleExpand = (id) => {
      setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

  return (
    <Drawer
      open={categoryDrawerOpen}
      onClose={closeCategoryDrawer}
      parent={null}
      level={null}
      placement={"left"}
    >
     <div className="flex flex-col w-full h-full bg-white cursor-pointer scrollbar-hide">
        {/* Header Section */}
        <div className="w-full flex justify-between items-center h-16 px-6 py-4 bg-cyan-500 text-white border-b border-gray-100">
          <h2 className="font-semibold  text-lg m-0 text-heading flex align-center">
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

        {/* Scrollable Content Section */}
        <div className="flex-grow w-full overflow-y-auto m-4">
          {/* Placeholder for some content */}
          <div className="flex-grow w-full mb-4">
            {/* Dropdown Example 1 */}
            {/* <div className="mb-2">
              <button
                onClick={() => toggleDropdown("department")}
                className="w-full text-start font-bold transition-all focus:outline-none text-lg"
              >
                Departments
              </button>
              {dropdownOpen.department && departments?.map((department) => (
                <div key={department._id} hidden={department.children.length <= 0}>
                  <div
                    className="flex justify-between items-center cursor-pointer font-semibold  text-sm px-6 py-2 border-b"
                    onClick={() => toggleExpand(department._id)}
                  >
                    <span>{showingTranslateValue(department?.name)}</span>
                    {expanded[department._id] ? <IoChevronUp /> : <IoChevronDown />}
                  </div>
                  
                  {expanded[department._id] && (
                    <div className="pl-6">
                      {department.children?.map((category) => (
                        <CategoryCard
                          key={category._id}
                          id={category._id}
                          icon={category.icon}
                          nested={[]}
                          title={showingTranslateValue(category.name)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {!dropdownOpen.department && (
              <hr/>
            )} */}

              <Link
                onClick={() => {
                  setIsLoading(!isLoading);
                  closeCategoryDrawer();
                }}
                href="/"
                className=" w-full text-start font-bold transition-all focus:outline-none"
              >
                Home
              </Link>
              <hr/>

            {/* Category Menu Toggle */}
            {storeCustomizationSetting?.navbar?.categories_menu_status && (
              <div className="my-3">
                <button
                  onClick={() => toggleDropdown("category")}
                  className="w-full text-start font-bold transition-all focus:outline-none"
                >
                  {showingTranslateValue(
                    storeCustomizationSetting?.navbar?.categories
                  )}
                </button>
                {dropdownOpen.category && data[0]?.children?.map((category) => (
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
            <hr/>

            {/* Three Links Aligned in a Column */}
            <div className="w-full flex flex-col gap-3 mt-3">
              <Link
                onClick={() => {
                  setIsLoading(!isLoading);
                  closeCategoryDrawer();
                }}
                href="/search"
                className=" w-full text-start font-bold transition-all focus:outline-none"
              >
                Products
              </Link>
              <hr/>
              <Link
                onClick={() => {
                  setIsLoading(!isLoading);
                  closeCategoryDrawer();
                }}
                href="/search?query=latest"
                className=" w-full text-start font-bold transition-all focus:outline-none"
              >
                New Products Edition
              </Link>
              <hr/>
              <Link
                onClick={() => {
                  setIsLoading(!isLoading);
                  closeCategoryDrawer();
                }}
                href={`${storeCustomizationSetting?.home?.promotion_button_link}`}
                className=" w-full text-start font-bold transition-all focus:outline-none"
              >
                {showingTranslateValue(storeCustomizationSetting?.home?.promotion_title)}
              </Link>
              {/* <hr/> */}
              {userInfo && storeCustomizationSetting?.navbar?.offers_menu_status && (
                <>
                  <Link
                    onClick={() => {
                      setIsLoading(!isLoading);
                      closeCategoryDrawer();
                    }}
                    href="/offer"
                    className=" w-full text-start font-bold transition-all focus:outline-none"
                  >
                    <span className="bg-emerald-300 text-white rounded-md px-4 py-1">
                      {showingTranslateValue(storeCustomizationSetting?.navbar?.offers)}
                    </span>
                  </Link>
                  {/* <hr/> */}
                </>
              )}
            </div>
          </div>

        </div>

        {/* Sticky Footer Section for User Authentication */}
        <div className="w-full px-4 py-3 border-t border-gray-200 text-center">
          {userInfo?.email ? (
            <button
              onClick={handleLogOut}
              className="w-full px-8 text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-600 transition-all focus:outline-none"
            >
              {showingTranslateValue(storeCustomizationSetting?.navbar?.logout)}
            </button>
          ) : (
            <button
              className="w-full px-8 text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-600 transition-all focus:outline-none"
              onClick={e => handleLinkClick("/auth/login")}
            >
              {showingTranslateValue(storeCustomizationSetting?.navbar?.login)}
            </button>
          )}
        </div>
      </div>
      {/* <Category /> */}
     
    </Drawer>
  );
};
export default dynamic(() => Promise.resolve(CategoryDrawer), { ssr: false });
