import dayjs from "dayjs";
import React from "react";
import Link from "next/link";
import Image from "next/image";
//internal import
import OrderTable from "@components/order/OrderTable";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Invoice = ({ data, printRef, globalSetting, currency }) => {
  // console.log('invoice data',data)

  const { getNumberTwo, numberToWords, capitalizeFirstLetter } = useUtilsFunction();

  return (
    <div ref={printRef}>
      <div className="bg-indigo-50 p-8 rounded-t-xl">
        <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50">
          <div>
          <h2 className="text-lg">
              <Link href="/">
                <Image
                  width={110}
                  height={40}
                  src="/logo/logo-color.png"
                  alt="logo"
                />
              </Link>
            </h2>
            <h1 className="font-bold  text-2xl uppercase">Invoice</h1>
            <h6 className="text-gray-700">
              Status :{" "}
              {data.status === "Delivered" && (
                <span className="text-emerald-500">{data.status}</span>
              )}
              {data.status === "POS-Completed" && (
                <span className="text-emerald-500">{data.status}</span>
              )}
              {data.status === "Pending" && (
                <span className="text-orange-500">{data.status}</span>
              )}
              {data.status === "Cancel" && (
                <span className="text-red-500">{data.status}</span>
              )}
              {data.status === "Processing" && (
                <span className="text-indigo-500">{data.status}</span>
              )}
              {data.status === "Deleted" && (
                <span className="text-red-700">{data.status}</span>
              )}
            </h6>
          </div>
          <div className="sm:text-right lg:text-right text-left">
            {/* <h2 className="text-lg  font-semibold mt-4 lg:mt-0 md:mt-0 w-full flex justify-end">
              <Link href="/">
                <Image
                  width={110}
                  height={40}
                  src="/logo/logo-color.png"
                  alt="logo"
                />
              </Link>
            </h2> */}
            <p className="text-sm text-gray-500">
                  {globalSetting?.shop_name} <br />
                  {globalSetting?.address} <br />
                  {globalSetting?.contact} <br />{" "}
                  <span> {globalSetting?.email} </span> <br />
                  {globalSetting?.website}
            </p>
          </div>
        </div>
        <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
          <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span className="font-bold  text-sm uppercase text-gray-600 block">
              Date
            </span>
            <span className="text-sm text-gray-500 block">
              {data.createdAt !== undefined && (
                <span>{dayjs(data?.createdAt).format("MMMM D, YYYY")}</span>
              )}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span className="font-bold  text-sm uppercase text-gray-600 block">
              Delivery Date
            </span>
            <span className="text-sm text-gray-500 block">
              {data.deliveryDate !== undefined && (
                <span>{dayjs(data?.deliveryDate).format("MMMM D, YYYY")}</span>
              )}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span className="font-bold  text-sm uppercase text-gray-600 block">
              GST NO
            </span>
            <span className="text-sm text-gray-500 block">
              {globalSetting?.vat_number}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span className="font-bold  text-sm uppercase text-gray-600 block">
              Drug License No
            </span>
            <span className="text-sm text-gray-500 block">
              {"PTG-149905 (21),PTG-149904 (20)"}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span className="font-bold  text-sm uppercase text-gray-600 block">
              Invoice No.
            </span>
            <span className="text-sm text-gray-500 block">
              #{data?.invoice}
            </span>
          </div>
          <div className="flex flex-col sm:text-right lg:text-right text-left">
            <span className="font-bold  text-sm uppercase text-gray-600 block">
              Customer Name.
            </span>
            <span className="text-sm text-gray-500 block">
              {"Mr./Mrs. "}{data?.user_info?.name} <br />
              {data?.user_info?.email}<br/>
              <span className="ml-2">{data?.user_info?.contact}</span>
              <br />
              {data?.user_info?.address}
              <br />
              {data?.city} {data?.country} {data?.zipCode}
            </span>
          </div>
        </div>
      </div>
      <div className="s">
        <div className="overflow-hidden lg:overflow-visible px-8 my-10">
          <div className="-my-2 overflow-x-auto">
            <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-xs bg-gray-100">
                  <th
                    scope="col"
                    className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-left"
                  >
                    Sr.
                  </th>
                  <th
                    scope="col"
                    className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    HSN
                  </th>
                  <th
                    scope="col"
                    className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    Refrence No
                  </th>
                  <th
                    scope="col"
                    className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-center"
                  >
                    Item Price
                  </th>

                  <th
                    scope="col"
                    className=" font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider text-right"
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <OrderTable data={data} currency={currency} />
            </table>
          </div>
        </div>
      </div>

      <div className="border-t border-b border-gray-100 p-10 bg-emerald-50">
        <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
          <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold  text-sm uppercase text-gray-600 block">
              Payment Method
            </span>
            <span className="text-sm text-gray-500 font-semibold  block">
              {data?.paymentMethod}
            </span>
          </div>
          // {data?.paymentMethod === "Cash" && (
          //   <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
          //     <span className="mb-1 font-bold  text-sm uppercase text-gray-600 block">
          //       COD Charge
          //     </span>
          //     <span className="text-sm text-gray-500 font-semibold  block">
          //       {currency}
          //       {"60"}
          //     </span>
          //   </div>
          // )}
          <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold  text-sm uppercase text-gray-600 block">
              Shipping Cost
            </span>
            <span className="text-sm text-gray-500 font-semibold  block">
              {currency}
              {getNumberTwo(data.shippingCost)}
            </span>
          </div>
          <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold  text-sm uppercase text-gray-600 block">
              Discount
            </span>
            <span className="text-sm text-gray-500 font-semibold  block">
              {currency}
              {getNumberTwo(data.discount)}
            </span>
          </div>
          <div className="flex flex-col sm:flex-wrap">
            <span className="mb-1 font-bold  text-sm uppercase text-gray-600 block">
              Total Amount
            </span>
            <span className="text-2xl  font-bold text-red-500 block">
              {currency}
              {getNumberTwo(Math.floor(data.total) + (data.total % 1 >= 0.5 ? 1 : 0))}
            </span>
          </div>
        </div>
          <div className="w-full text-right text-gray-500 font-semibold  mt-2">
            {capitalizeFirstLetter(numberToWords(getNumberTwo(Math.floor(data.total) + (data.total % 1 >= 0.5 ? 1 : 0))))}{" Only"}
          </div>
      </div>
    </div>
  );
};

export default Invoice;
