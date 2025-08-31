import React from "react";
import {
  FiDollarSign,
  FiHome,
  FiMapPin,
  FiRepeat,
  FiShieldOff,
  FiSun,
  FiTruck,
} from "react-icons/fi";

//internal import
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Card = ({cod}) => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <ul className="my-0">
      {showingTranslateValue(storeCustomizationSetting?.slug?.card_description_one) && (
      <li className="flex items-center py-3">
        <span className="text-xl text-gray-400 items-start mr-4">
          <FiTruck />
        </span>
        <p className="font-sans leading-5 text-sm text-gray-500">
          {showingTranslateValue(
            storeCustomizationSetting?.slug?.card_description_one
          )}
        </p>
      </li>
      )}
      {showingTranslateValue(storeCustomizationSetting?.slug?.card_description_two) && (
      <li className="flex items-center py-3">
        <span className="text-xl text-gray-400 items-start mr-4">
          <FiHome />
        </span>
        <p className="font-sans leading-5 text-sm text-gray-500">
          {showingTranslateValue(
            storeCustomizationSetting?.slug?.card_description_two
          )}
        </p>
      </li>
      )}
      {showingTranslateValue(storeCustomizationSetting?.slug?.card_description_three) && (
      <li className="flex items-center py-3">
        <span className="text-xl text-gray-400 items-start mr-4">
          <FiDollarSign />
        </span>
        {cod === true ? (
          <p className="font-sans leading-5 text-sm text-gray-500">
              {showingTranslateValue(
                storeCustomizationSetting?.slug?.card_description_three
              )}
          </p>
        ):(
          <p className="font-sans leading-5 text-sm text-gray-500">
              Cash on Delivery Not Available.
          </p>
        )}
      </li>
      )}
      {showingTranslateValue(storeCustomizationSetting?.slug?.card_description_four) && (
          <li className="flex items-center py-3">
            <span className="text-xl text-gray-400 items-start mr-4">
              <FiRepeat />
            </span>
            <p className="font-sans leading-5 text-sm text-gray-500">
              {showingTranslateValue(storeCustomizationSetting?.slug?.card_description_four)}
            </p>
          </li>
      )}
      {showingTranslateValue(storeCustomizationSetting?.slug?.card_description_five) && (
          <li className="flex items-center py-3">
            <span className="text-xl text-gray-400 items-start mr-4">
              <FiShieldOff />
            </span>
            <p className="font-sans leading-5 text-sm text-gray-500">
              {showingTranslateValue(
                storeCustomizationSetting?.slug?.card_description_five
              )}
            </p>
          </li>
      )}
      {showingTranslateValue(storeCustomizationSetting?.slug?.card_description_six) && (
          <li className="flex items-center py-3">
            <span className="text-xl text-gray-400 items-start mr-4">
              <FiSun />
            </span>
            <p className="font-sans leading-5 text-sm text-gray-500">
              {showingTranslateValue(
                storeCustomizationSetting?.slug?.card_description_six
              )}
            </p>
          </li>
      )}
      {showingTranslateValue(storeCustomizationSetting?.slug?.card_description_seven) && (
      <li className="flex items-center py-3">
        <span className="text-xl text-gray-400 items-start mr-4">
          <FiMapPin />
        </span>
        <p className="font-sans leading-5 text-sm text-gray-500">
          {showingTranslateValue(
            storeCustomizationSetting?.slug?.card_description_seven
          )}
        </p>
      </li>
      )}
    </ul>
  );
};

export default Card;
