import React from "react";
import { Select } from "@windmill/react-ui";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const CustomSelect = ({
  register,
  name,
  label,
  objectList = [],
}) => {
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <Select
      {...register(name, {
        required: `${label} is required!`,
      })}
      name={name}
    >
      <option value="">{label}</option>

      {Array.isArray(objectList) &&
        objectList.map((item) => (
          <option
            key={item?._id}
            value={item?._id ?? item?._id === false ? item._id : ""}
          >
            {showingTranslateValue(item?.name || item?.title) ||
              item?.name ||
              item?.title}
          </option>
        ))}
    </Select>
  );
};

export default CustomSelect;
