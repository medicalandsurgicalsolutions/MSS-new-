import React from "react";
import { Select } from "@windmill/react-ui";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const CustomSelect = ({ setData, register, name, label, objectList = [] }) => {

  const { showingTranslateValue } = useUtilsFunction();

  return (
    <>
      <Select
        onChange={(e) => setData(e.target.value)}
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>{label}</option>
        {objectList.map(item => (
          <option key={item?._id} value={item?._id}>{showingTranslateValue(item?.name || item?.title) || item?.name}</option>
        ))}
      </Select>
    </>
  );
};

export default CustomSelect;
