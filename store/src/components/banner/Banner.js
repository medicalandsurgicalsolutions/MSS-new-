import Link from "next/link";
import React from "react";

//internal import
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Banner = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="w-full">
              <h1 className=" text-xl w-full">
                <span className="text-emerald-600 font-bold">
                  {showingTranslateValue(storeCustomizationSetting?.home?.promotion_title)}
                </span>
              </h1>
              <p className="text-gray-500 w-full mt-2 sm:mt-0">
                {showingTranslateValue(storeCustomizationSetting?.home?.promotion_description)}
              </p>
          </div>
          <Link
              href={`${storeCustomizationSetting?.home?.promotion_button_link}`}
              className="w-full lg:w-40 sm:w-auto text-sm font-medium mt-4 sm:mt-0 px-6 py-2 bg-emerald-500 text-center rounded-full text-white hover:bg-emerald-700"
            >
              {showingTranslateValue(storeCustomizationSetting?.home?.promotion_button_name)}
          </Link>
      </div>
    </>
  );
};

export default Banner;
