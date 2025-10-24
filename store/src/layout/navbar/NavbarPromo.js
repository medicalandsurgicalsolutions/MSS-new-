import { Fragment, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Transition, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import SettingServices from "@services/SettingServices";
import Cookies from "js-cookie";

//internal import
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
  // const [currentLang, setCurrentLang] = useState({});
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
      currentLang = {}; // Fallback to an empty object
    }
  }

  const userInfo = getUserSession();

  const handleSubNestedCategory = (id, categoryName) => {
    const name = categoryName.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");
    router.push(/search?category=${name}&_id=${id});
    setIsLoading(!isLoading);
  };

  const handleSubCategory = (id, categoryName) => {
    const name = categoryName.toLowerCase().replace(/[^A-Z0-9]+/gi, "-");
    router.push(/search?category=${name}&_id=${id});
    setIsLoading(!isLoading);
  };

  const handleLanguage = (lang) => {
    // setCurrentLang(lang);
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
      {
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
            // console.log("result", result);
            // // setCurrentLang(currentLanguage);
          }
        } catch (err) {
          notifyError(err);
          // console.log("error on getting lang", err);
        }
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
  <div className="max-w-screen-2xl mx-auto px-3 sm:px-2 lg:px-2 flex justify-between items-center 
                gap-2 lg:gap-[7px] lg:text-sm xl:text-base">
      <div>
         {/* <Image src={"https://decorncompany.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjrbdgtzr%2Fimage%2Fupload%2Fv1734243800%2Fproduct%2FWhatsAppImage2024-12-15at11.18.45AM.jpg&w=640&q=75"} // Replace with your image path alt="Home" width={200} // Set width of the image height={100} // Set height of the image className="mx-auto rounded-lg h-16 w-20" // Center image and add margin bottom /> */} 
         <Link onClick={() =>
         setIsLoading(!isLoading)} href="/" className=" mx-4 py-2 hover:text-emerald-600" > Home </Link> 
      </div>
      <div>
         {storeCustomizationSetting?.home?.quick_delivery_subtitle?.en && ( <> 
         <Link onClick={() =>
         setIsLoading(!isLoading)} href="/search?query=latest" > 
         <div className="mx-4 py-2 hover:text-emerald-600"> { storeCustomizationSetting?.home?.quick_delivery_subtitle ?.en } </div>
         </Link> </> )} 
      </div>
      {data[0]?.children?.slice(0, 6)?.map((category, index) => { return ( 
      <div key={index} className="relative cursor-pointer group py-2" onClick={() =>
         handleSubCategory( category?._id, showingTranslateValue(category?.name) ) } > 
         <div className=" mx-4 group hover:text-emerald-600 flex items-center space-x-2">
            <div>{capitalizeWords(category?.name?.en)}</div>
            {category?.children && ( 
            <div className="group-hover:rotate-180 duration-200 py-2">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
               </svg>
            </div>
            )} 
         </div>
         {category?.children && ( 
         <div className="absolute left-0 w-60 top-full hidden group-hover:block shadow-lg">
            {category?.children && ( <div className="absolute left-0 w-auto top-full rounded-md hidden group-hover:block bg-cyan-500 text-white shadow-lg p-4 gap-y-2 gap-x-6 " style={{ display: "grid", gridTemplateColumns: repeat(${Math.ceil( category.children.length / 8 )}, auto), }} > {category?.children?.map((subCategory, subIndex) => ( 
            <div className="border-b ">
               {/* 
               <div className="h-8 w-8">
                  <Image src={subCategory?.icon} alr="sub category" height={300} width={300} />
               </div>
               */} 
               <div key={subIndex} className="block px-1 text-sm cursor-pointer py-1 hover:translate-x-1.5 duration-100 whitespace-nowrap" onClick={(event) => { event.stopPropagation(); handleSubNestedCategory( subCategory?._id, showingTranslateValue(subCategory?.name) ); }} > {subCategory?.name?.en} </div>
            </div>
            ))} 
         </div>
         )} 
      </div>
      )} 
   </div>
   ); })} 
   <div>
      <Link onClick={() =>
      setIsLoading(!isLoading)} href="/contact-us"> 
      <div className="mx-4 py-2 hover:text-emerald-600"> Buy In Bulk </div>
      </Link> 
   </div>
</div>
</div> 
    </>
  );
};

export default NavbarPromo;
