import React from 'react'

const CheckBoxLabel = ({ id, name, label,handleClick, isChecked }) => {
  return (
        <label className="flex items-center dark:text-gray-300">
            <input
                id={id}
                name={name}
                type="checkbox"
                onChange={handleClick}
                checked={isChecked}
                className="mr-2" 
            />
            {label}
        </label> 
   )
}

export default CheckBoxLabel