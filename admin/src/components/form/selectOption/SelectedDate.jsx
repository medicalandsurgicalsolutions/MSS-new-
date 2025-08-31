import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

// Internal imports
import OrderServices from "@/services/OrderServices";
import { notifySuccess, notifyError } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";

const SelectDate = ({ id, order }) => {
  const { setIsUpdate } = useContext(SidebarContext);
  const [selectedDate, setSelectedDate] = useState(null); // State for storing selected date
  // console.log("Orders History ", order?.deliveryDate);
  

  // Handle API call on date selection
  const handleChangeStatus = (id, deliveryDate) => {
    if (deliveryDate) {
      OrderServices.updateOrder(id, { deliveryDate: deliveryDate })
        .then((res) => {
          notifySuccess(res.message);
          setIsUpdate(true);
        })
        .catch((err) => notifyError(err.message));
    } else {
      notifyError("Please select a valid date.");
    }
  };

  return (
    <div>
        {/* DatePicker component */}
        <DatePicker
            selected={order?.deliveryDate ? new Date(order.deliveryDate.slice(0,10)) : selectedDate} // Use order?.deliveryDate if available
            onChange={(date) => {
            setSelectedDate(date); // Set the selected date in state
            handleChangeStatus(id, date); // Call the API when date is selected
            }}
            placeholderText="Select delivery date" // Placeholder text
            minDate={new Date()}
            className="border p-2 rounded-md text-sm font-semibold" // Custom styles
        />
    </div>
  );
};

export default SelectDate;
