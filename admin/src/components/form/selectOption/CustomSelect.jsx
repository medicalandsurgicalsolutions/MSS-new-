import React from "react";
import { Select } from "@windmill/react-ui";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const CustomSelect = ({
  setValue,          // ✅ NEW
  register,
  name,
  label,
  objectList = [],
  defaultValue = "", // ✅ NEW
}) => {
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <Select
      name={name}
      defaultValue={defaultValue}
      {...register(name, {
        required: `${label} is required!`,
      })}
      onChange={(e) => {
        setValue && setValue(name, e.target.value); // ✅ IMPORTANT
      }}
    >
      <option value="" hidden>
        {label}
      </option>

      {objectList.map((item) => (
        <option key={item?._id} value={item?._id}>
          {showingTranslateValue(item?.name || item?.title) || item?.name}
        </option>
      ))}
    </Select>
  );
};

export default CustomSelect;
