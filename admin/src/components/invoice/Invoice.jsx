import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

const Invoice = ({ data, currency, getNumberTwo }) => {
  return (
    <>
      <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm ">
        {data?.cart?.map((item, i) => (
          <TableRow key={i} className="dark:border-gray-700 dark:text-gray-400">
            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-black text-left">
              {i + 1}{" "}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-black text-center">
              {item?.hsn || "N/A"}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-black text-center">
              {item?.productRefrenceNo || "N/A"}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-black text-center">
              <span
                className={`text-black font-semibold  dark:text-gray-300 text-xs ${
                  item.title.length > 15 ? "wrap-long-title" : "" // Apply class conditionally
                }`}
              >
                {item.title}
              </span>
            </TableCell>
            {/* <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
              {item?.brand?.name?.en}{" "}
            </TableCell> */}
            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
              {item.quantity}{" "}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
              {currency}
              {getNumberTwo(Math.floor(item.price) + (item.price % 1 >= 0.5 ? 1 : 0))}
            </TableCell>

            <TableCell className="px-6 py-1 whitespace-nowrap text-right font-bold text-black dark:text-emerald-500">
              {currency}
              {getNumberTwo(Math.floor(item.itemTotal) + (item.itemTotal % 1 >= 0.5 ? 1 : 0))}
              {item?.gst && (
                <p className="pb-0 mb-0 ml-2 text-gray-800 text-[11px]">{`(Inclusive of ${item?.gst}% GST)`}</p>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default Invoice;
