import React from "react";
import { Select } from "@windmill/react-ui";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const CustomSelect = ({
  setData = () => {}, // ✅ SAFE DEFAULT (important)
  register,
  name,
  label,
  objectList = [],
}) => {
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <Select
      name={name}
      {...register(name, {
        required: `${label} is required!`,
      })}
      onChange={(e) => setData(e.target.value)}
    >
      {/* ✅ placeholder option */}
      <option value="">{label}</option>

      {objectList?.length > 0 &&
        objectList.map((item) => (
          <option key={item?._id} value={item?._id}>
            {showingTranslateValue(item?.name || item?.title) ||
              item?.name}
          </option>
        ))}
    </Select>
  );
};

export default CustomSelect;
