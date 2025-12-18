import React from "react";
import { Select } from "@windmill/react-ui";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const CustomSelect = ({ setData, register, name, label, objectList = [] }) => {
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <Select
      name={name}
      {...register(name, {
        required: `${label} is required!`,
      })}
      onChange={(e) => setData && setData(e.target.value)}
    >
      <option value="" hidden>
        {label}
      </option>

      {Array.isArray(objectList) &&
        objectList
          .filter((item) => item && item._id)  
          .map((item) => (
            <option key={item._id} value={item._id}>
              {showingTranslateValue(item?.name || item?.title) || item?.name}
            </option>
          ))}
    </Select>
  );
};

export default CustomSelect;
