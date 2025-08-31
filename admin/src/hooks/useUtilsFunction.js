import dayjs from "dayjs";
import SettingServices from "@/services/SettingServices";
import { useDispatch, useSelector } from "react-redux";
import { addSetting, removeSetting } from "@/reduxStore/slice/settingSlice";
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";

const useUtilsFunction = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { lang } = useContext(SidebarContext);

  const settings = useSelector((state) => state.setting.settingItem);

  const globalSetting = settings.find(
    (value) => value.name === "globalSetting"
  );

  // console.log("globalSetting", globalSetting);
  //for date and time format
  const showTimeFormat = (data, timeFormat) => {
    return dayjs(data).format(timeFormat);
  };

  const showDateFormat = (data) => {
    return dayjs(data).format(globalSetting?.default_date_format);
  };

  const showDateTimeFormat = (data) => {
    return dayjs(data).format(`${globalSetting?.default_date_format}  h:mm A`);
  };

  //for formatting number

  const getNumber = (value = 0) => {
    return Number(parseFloat(value || 0).toFixed(2));
  };

  const getNumberTwo = (value = 0) => {
    return parseFloat(value || 0).toFixed(globalSetting?.floating_number || 2);
  };

  //for translation
  const showingTranslateValue = (data) => {
    return data !== undefined && Object?.keys(data).includes(lang)
      ? data[lang]
      : data?.en;
  };

  const showingImage = (data) => {
    return data !== undefined && data;
  };

  const showingUrl = (data) => {
    return data !== undefined ? data : "!#";
  };

  const currency = globalSetting?.default_currency || "$";

  useEffect(() => {
    // console.log("globalSetting", globalSetting);
    const fetchGlobalSetting = async () => {
      try {
        setLoading(true);
        // console.log("globalSetting setting not available");
        const res = await SettingServices.getGlobalSetting();
        const globalSettingData = {
          ...res,
          name: "globalSetting",
        };

        // console.log("Data",res)
        dispatch(addSetting(globalSettingData));

        setLoading(false);
      } catch (err) {
        setError(err.message);
        // console.log("Error on getting storeCustomizationSetting setting", err);
      }
    };

    if (!globalSetting) {
      fetchGlobalSetting();
    }
  }, [globalSetting]);


  function numberToWords(num) {
    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    
    if (num === 0) return "zero";
  
    let word = "";
    
    // Divide into different place values (crore, lakh, thousand, hundred, etc.)
    let crore = Math.floor(num / 10000000);
    num %= 10000000;
    let lakh = Math.floor(num / 100000);
    num %= 100000;
    let thousand = Math.floor(num / 1000);
    num %= 1000;
    let hundred = Math.floor(num / 100);
    num %= 100;
    let remainder = num;
  
    // Build words for each place
    if (crore > 0) {
      word += convertLessThanThousand(crore) + " crore ";
    }
    if (lakh > 0) {
      word += convertLessThanThousand(lakh) + " lakh ";
    }
    if (thousand > 0) {
      word += convertLessThanThousand(thousand) + " thousand ";
    }
    if (hundred > 0) {
      word += convertLessThanThousand(hundred) + " hundred ";
    }
    if (remainder > 0) {
      if (remainder < 10) {
        word += ones[remainder];
      } else if (remainder > 10 && remainder < 20) {
        word += teens[remainder - 10];
      } else {
        word += tens[Math.floor(remainder / 10)] + " " + ones[remainder % 10];
      }
    }
  
    return word.trim();
  }
  
  // Helper function to handle numbers less than 1000
  function convertLessThanThousand(num) {
    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    
    let word = "";
    
    if (num > 99) {
      word += ones[Math.floor(num / 100)] + " hundred ";
      num %= 100;
    }
    if (num > 10 && num < 20) {
      word += teens[num - 10];
    } else {
      word += tens[Math.floor(num / 10)] + " " + ones[num % 10];
    }
    
    return word.trim();
  }  // Outputs: "one lakh twenty-three thousand four hundred fifty-six"
  
  function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return {
    error,
    loading,
    currency,
    getNumber,
    getNumberTwo,
    showTimeFormat,
    showDateFormat,
    showingImage,
    showingUrl,
    numberToWords,
    capitalizeFirstLetter,
    globalSetting,
    showDateTimeFormat,
    showingTranslateValue,
  };
};

export default useUtilsFunction;
