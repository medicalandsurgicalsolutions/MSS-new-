import ReactToPrint from "react-to-print";
import { FiPrinter } from "react-icons/fi";
import { useRef } from "react";
import { useParams } from "react-router";
import OrderServices from "@/services/OrderServices";
import useAsync from "@/hooks/useAsync";
import useUtilsFunction from "@/hooks/useUtilsFunction";
export default function ShippingLabel() {
  const printRef = useRef();
  const { id } = useParams();

  const { data, loading, error } = useAsync(() =>
    OrderServices.getOrderById(id)
  );

  const { globalSetting } = useUtilsFunction();
  console.log(data);

  function formatShippingAddress(userInfo) {
    if (!userInfo) return "";

    const { flat, address, landmark, city, district, state, country, zipCode } =
      userInfo;

    // Helper to clean and join
    const joinParts = (...parts) =>
      parts
        .map((part) => part?.trim())
        .filter(Boolean)
        .join(", ");

    const parts = [
      joinParts(flat, address),
      joinParts(landmark, city),
      joinParts(district, state, country),
      zipCode?.toString().trim(),
    ].filter(Boolean);

    return parts.join(", ");
  }

  function NumberFormatter(number) {
    if (isNaN(number)) return "";
    return Number(number).toLocaleString("en-IN");
  }
  function formatAddress(info) {
    if (!info) return "";

    const { flat, address, landmark, city, district, state, country, zipCode } =
      info;

    const parts = [
      [flat, address].filter(Boolean).join(", "),
      [landmark, city].filter(Boolean).join(", "),
      [district, state, country].filter(Boolean).join(", "),
      zipCode,
    ].filter(Boolean);

    return parts.join(", ");
  }
  function formatDateTime(dateInput) {
    if (!dateInput) return "";

    const date = new Date(dateInput);

    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // convert to 12-hour format

    return `${day}-${month}-${year} | ${hours}:${minutes} ${ampm}`;
  }
  function lowerCaser(string) {
    return string.toLowerCase();
  }
  return (
    <>
    <div
      ref={printRef}
      className="w-full border border-gray-300 p-4 bg-white text-sm font-serif"
    >
      <div id="printable" className="m-2 border border-gray-600 p-4">
        <section className="heading flex justify-between items-center border-b border-gray-300 px-4 py-2">
          <div className="flex flex-col text-2xl tracking-wide  items-start">
            <h1 className="font-russo">
              {data?.paymentMethod === "RazorPay"
                ? "PREPAID"
                : "CASH ON DELIVERY"}
            </h1>
            <div className="text-sm flex justify-end items-end px-0.5">
              <span className="font-semibold">Invoice ID:</span> &nbsp;
              <span>{data?.invoice}</span>
            </div>
          </div>

          <div>
            <img className="h-12" src="/shipping_logo.png" alt="logo" />
          </div>
        </section>
        <section className="px-2 py-4 grid grid-cols-5 gap-2 border-b border-gray-300">
          <div className="address col-span-3 flex justify-center flex-col">
            <p className=" mb-1 text-base">
              Deliver To -{" "}
              <span className="font-bold text-xl">
                {" "}
                {data?.user_info?.name}
              </span>
            </p>
            <div className=" w-full max-w-md bg-white">
              <div className="mb-1 text-base px-0.5">
                {formatShippingAddress(data?.user_info)}
              </div>
              {data?.user_info?.contact && (
                <div className="">
                  <p>
                    <span>Contact Number: </span>
                    <span className="font-medium">
                      {data?.user_info?.contact}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="rest_user_info border-l border-gray-300  py-1 col-span-2">
            <div className="payment px-4 space-y-1 text-base">
              <p>
                <span className="">Payment Method:</span>{" "}
                <span className=" tracking-wide font-semibold">
                  {data?.paymentMethod === "RazorPay"
                    ? "RazorPay"
                    : "Cash on Delivery"}
                </span>
              </p>
              {data?.paymentMethod === "Cash" && (
                <p className="">
                  <span className="">COD Charge: </span>
                  <span className="font-semibold">
                    {"60"} INR
                  </span>
                </p>
              )}
              <p className="">
                <span className="">Total Price: </span>
                <span className="font-semibold">
                  {NumberFormatter(data?.total)} INR
                </span>
              </p>
            </div>
            <div className="w-full border-b border-gray-300 my-2 mx-2"></div>
            <div className="date px-4">
              <div>Ordered At: </div>
              <div className="font-semibold">
                {formatDateTime(data?.createdAt)}
              </div>
            </div>
          </div>
        </section>
        <section className="p-2 border-b border-gray-300">
          <div className="text-sm leading-6">
            <p>
              <span className="font-semibold">Sold By:</span> Medical & Surgical
              Solutions
            </p>
            <p>
              <span className="font-semibold">Contact:</span> +91 9643344588
            </p>
            <p className="font-medium">
              {formatAddress({
                flat: "402 Ground Floor",
                address: "Patparganj Industrial Area",
                city: "Delhi",
                zipCode: "110092",
              })}
            </p>
            <p>
              <span className="font-semibold">GSTIN:</span>{" "}
              {globalSetting?.vat_number}
            </p>
          </div>
        </section>
        <section className="border-b border-gray-300 py-4">
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Product</th>
                <th className="p-2 border">HSN</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Shipping Cost</th>
                <th className="p-2 border">Invoice Value</th>
                <th className="p-2 border">Final Price</th>
              </tr>
            </thead>
            {data?.cart?.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td className="p-2 border max-w-80 capitalize">
                      {lowerCaser(item?.title)}
                    </td>
                    <td className="p-2 border">{item?.hsn}</td>
                    <td className="p-2 border">{item?.quantity}</td>
                    <td className="p-2 border">
                      {item?.deliveryCharge > 0
                        ? `${item?.deliveryCharge} INR`
                        : "Free Delivery"}
                    </td>
                    <td className="p-2 border">{item?.itemTotal} INR</td>
                    <td className="p-2 border">
                      {item?.itemTotal + item?.deliveryCharge} INR
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </section>
        <section className="p-2">
          <div className="text-sm space-y-1 flex justify-between items-center border-b border-gray-300 py-3">
            <div>
              <div className="">
              {data?.deliveryPartner && (
                <p>
                <span className="font-bold">Courier Name:</span>{" "}
                {data?.deliveryPartner}
              </p>
              )}
              {data?.trackno && (
                <p>
                <span className="font-bold">Courier AWB No:</span>{" "}
                  {data?.trackno}
              </p>
              )}
              </div>
            </div>
            {/* <div>
              <p>
                <span className="font-semibold">Tracking ID:</span>{" "}
                {data?.trackno}
              </p>
              <p>
                <span className="font-semibold">Delivery Partner:</span>{" "}
                {data?.deliveryPartner}
              </p>
            </div> */}
          </div>

          <div className="text-sm">
            <p className="font-bold mt-2">Return Address:</p>
            <p className="">Medical & Surgical Solutions</p>
            <p className="">
              402 Ground Floor Patparganj Industrial Area Delhi - 110092
            </p>
          </div>
        </section>
      </div>
    </div>

    <ReactToPrint
    trigger={() => (
      <button className="flex w-36 items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 mt-4 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600  w-auto">
        {"Print Invoice"}
        <span className="ml-2">
          <FiPrinter />
        </span>
      </button>
    )}
    content={() => printRef.current}
    documentTitle="Invoice"
    />

</>
  );
}
