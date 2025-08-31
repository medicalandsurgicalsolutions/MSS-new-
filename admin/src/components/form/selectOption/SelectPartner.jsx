import React, { useContext, useState } from "react";

// Internal imports
import OrderServices from "@/services/OrderServices";
import { notifySuccess, notifyError } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";

const SelectPartner = ({ id, order }) => {
  const { setIsUpdate } = useContext(SidebarContext);
  const [inputValue, setInputValue] = useState(""); // State for storing entered text

  console.log("Entering Partner", order);

  // Handle API call on input change
  const handleInputChange = () => {
    if (inputValue.trim()) {
      OrderServices.updateOrderDeliveryPartner(id, { deliveryPartner: inputValue })
        .then((res) => {
          notifySuccess(res.message);
          setIsUpdate(true);
        })
        .catch((err) => notifyError(err.message));
    } else {
      notifyError("Please enter a valid value.");
    }
  };

  return (
    <div>
      {/* Text input for entering value */}
      <input
        type="text"
        value={inputValue || order?.deliveryPartner}
        onChange={(e) => setInputValue(e.target.value)} // Update state with entered text
        onBlur={handleInputChange} // Call API when input loses focus
        placeholder="Enter name"
        className="border p-2 rounded-md text-sm font-semibold"
      />
    </div>
  );
};

export default SelectPartner;
