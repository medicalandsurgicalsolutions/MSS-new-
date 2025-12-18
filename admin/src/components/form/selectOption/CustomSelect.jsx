import React from "react";
import { Select } from "@windmill/react-ui";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const CustomSelect = ({
  register,
  name,
  label,
  objectList = [],
  setValue,
  defaultValue,
}) => {
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <Select
      {...register(name, {
        required: `${label} is required!`,
      })}
      defaultValue={defaultValue || ""}
      onChange={(e) => {
        setValue && setValue(name, e.target.value); // ✅ important
      }}
    >
      <option value="" disabled>
        {label}
      </option>

      {objectList
        ?.filter((item) => item && item._id)
        .map((item) => (
          <option key={item._id} value={item._id}>
            {showingTranslateValue(item?.name || item?.title) || item?.name}
          </option>
        ))}
    </Select>
  );
};

export default CustomSelect;
