import React from "react";
import dayjs from "dayjs";
import Link from "next/link";

const OrderHistory = ({ order, currency }) => {
  // console.log("Recent Orders ", order);
  return (
    <>
      {/* <td className="px-2 py-3 leading-6 whitespace-nowrap">
        <span className="uppercase text-sm font-medium">
          {order?._id?.substring(20, 24)}
        </span>
      </td> */}
      <td className="px-2 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm">
          {dayjs(order.createdAt).format("MMMM D, YYYY")}
        </span>
      </td>

      <td className="px-2 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm">
          {dayjs(order.deliveryDate).format("MMMM D, YYYY")}
        </span>
      </td>

      <td className="px-2 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm">{order.paymentMethod}</span>
      </td>
      <td className="px-2 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
        {order.status === "Delivered" && (
          <span className="text-emerald-500">{order.status}</span>
        )}
        {order.status === "Pending" && (
          <span className="text-orange-500">{order.status}</span>
        )}
        {order.status === "Cancel" && (
          <span className="text-red-500">{order.status}</span>
        )}
        {order.status === "Processing" && (
          <span className="text-indigo-500">{order.status}</span>
        )}
      </td>
      <td className="px-2 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm font-bold">
          {currency}
          {parseFloat(order?.total).toFixed(2)}
        </span>
      </td>
      <td className="px-2 py-3 leading-6 text-center whitespace-nowrap">
        {order?.cart?.map((product, index) => (
          <div key={index} className="mb-1">
            <span className="text-sm font-semibold">
              {index + 1}. {product?.title?.slice(0, 30)}{" "}
            </span>
            <Link
              href={`/product/${product?.slug}#reviews`}
              className="text-blue-800 font-bold ml-1 text-[16px]"
            >
              Review
            </Link>
          </div>
        ))}
      </td>
    </>
  );
};

export default OrderHistory;
