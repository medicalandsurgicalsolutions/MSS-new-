import React from "react";
import { Select } from "@windmill/react-ui";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const SelectRole = ({ setRole, register, name, label, roles = [] }) => {

  const { showingTranslateValue } = useUtilsFunction();


  return (
    <>
      <Select
        onChange={(e) => setRole(e.target.value)}
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
          Staff role
        </option>
        {roles.map(role => (
          <option key={role?._id} value={role?._id}>{showingTranslateValue(role?.name)}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectRole;
