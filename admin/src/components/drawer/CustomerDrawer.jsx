import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

//internal import

import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import useCustomerSubmit from "@/hooks/useCustomerSubmit";
import DrawerButton from "@/components/form/button/DrawerButton";
import useAsync from "@/hooks/useAsync";
import CouponServices from "@/services/CouponServices";
import Multiselect from "multiselect-react-dropdown";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const CustomerDrawer = ({ id }) => {
  const { 
    coupons,
    setCoupons,
    register,
    handleSubmit, 
    onSubmit, 
    errors, 
    isSubmitting
  } = useCustomerSubmit(id);

    const { data } = useAsync(CouponServices.getAllCoupons);
    

    const [state, setState] = useState({
      options: [],
      selectedValues: []
    });
    
    const { showingTranslateValue } = useUtilsFunction();
    
    useEffect(() => {
      if (data) {
        const options = data.map(coupon => ({
          name: showingTranslateValue(coupon?.title),
          id: coupon._id
        }));
    
        setState(prevState => ({
          ...prevState,
          selectedValues: options.filter(o =>
            coupons.some(c => c.coupon.toString() === o.id)
          )
        }));
    
        setState(prevState => ({
          ...prevState,
          options
        }));
      }
    }, [data, coupons]);
    
    const onSelect = (selectedList, selectedItem) => {
      const selectedIds = selectedList.map(item => item.id);
      setState(prevState => ({
        ...prevState,
        selectedValues: selectedList
      }));
      const updatedCoupons = selectedIds.map(id => ({
        coupon: id,
        isUsed: false
      }));
    
      setCoupons(updatedCoupons);
    };
    
    const onRemove = (selectedList, removedItem) => {
      const selectedIds = selectedList.map(item => item.id);
      setState(prevState => ({
        ...prevState,
        selectedValues: selectedList
      }));
      const updatedCoupons = selectedIds.map(id => ({
        coupon: id,
        isUsed: false
      }));
    
      setCoupons(updatedCoupons);
    };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={"Update Customer"}
            description={"Update your Customer necessary information from here"}
          />
        ) : (
          <Title
            title={"Add Customer"}
            description={"Add your Customer necessary information from here"}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Name"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Name"
                  name="name"
                  type="text"
                  placeholder={"Name"}
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Email"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder={"Email"}
                />
                <Error errorName={errors.email} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Phone"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Phone"
                  name="phone"
                  type="text"
                  placeholder={"Phone"}
                />
                <Error errorName={errors.phone} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Address"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Address"
                  name="address"
                  type="text"
                  placeholder={"Address"}
                />
                <Error errorName={errors.address} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Coupons"} />
              <div className="col-span-8 sm:col-span-4">
                <Multiselect
                  options={state.options}
                  selectedValues={state.selectedValues}
                  onSelect={onSelect}
                  onRemove={onRemove}
                  displayValue="name"
                  name="coupons"
                />
                <Error errorName={errors.address} />
              </div>
            </div>
          </div>
          

          <DrawerButton id={id} title="Customer" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default CustomerDrawer;
