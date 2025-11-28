import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow, Badge } from "@windmill/react-ui";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";

import Status from "@/components/table/Status";
import Tooltip from "@/components/tooltip/Tooltip";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import PrintReceipt from "@/components/form/others/PrintReceipt";
import SelectStatus from "@/components/form/selectOption/SelectStatus";
import SelectDate from "@/components/form/selectOption/SelectedDate";
import SelectInput from "@/components/form/selectOption/SelectInput";
import TrackInput from "@/components/form/selectOption/TrackInput";
import SelectPartner from "@/components/form/selectOption/SelectPartner";

const OrderTable = () => {
  const { showDateTimeFormat, currency, getNumberTwo } = useUtilsFunction();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <TableBody className="dark:bg-gray-900">
      {orders?.map((order, i) => (
        <TableRow key={order._id || i}>
          {/* Invoice */}
          <TableCell>
            <span className="font-semibold uppercase text-xs">{order?.invoice}</span>
          </TableCell>

          {/* Date */}
          <TableCell>
            <span className="text-sm">{showDateTimeFormat(order?.createdAt)}</span>
          </TableCell>

          {/* Customer */}
          <TableCell className="text-xs">
            <span className="text-sm">{order?.user_info?.firstName} {order?.user_info?.lastName}</span>
          </TableCell>

          {/* Payment */}
          <TableCell>
            <span className="text-sm font-semibold">{order?.paymentMethod}</span>
          </TableCell>

          {/* Total */}
          <TableCell>
            <span className="text-sm font-semibold">
              {currency}
              {getNumberTwo(Math.floor(order?.total) + (order?.total % 1 >= 0.5 ? 1 : 0))}
            </span>
          </TableCell>

          {/* Date Select */}
          <TableCell>
            <SelectDate id={order._id} order={order} />
          </TableCell>

          {/* Partner Select */}
          <TableCell>
            <SelectPartner id={order._id} order={order} />
          </TableCell>

          {/* Input Select */}
          <TableCell>
            <SelectInput id={order._id} order={order} />
          </TableCell>

          {/* Track Input */}
          <TableCell>
            <TrackInput id={order._id} order={order} />
          </TableCell>

          {/* Status */}
          <TableCell className="text-xs">
            <Status status={order?.status} />
          </TableCell>

          {/* Cancel Status */}
          <TableCell className="text-center">
            {order.isCancelByCustomer ? (
              order.paymentMethod === "RazorPay" ? (
                <Badge type="success">Refunded</Badge>
              ) : (
                <Badge type="success">Cancelled</Badge>
              )
            ) : (
              <SelectStatus id={order._id} order={order} />
            )}
          </TableCell>

          {/* Shipping */}
          <TableCell className="text-center">
            <Link to={`/shipping/${order._id}`}>View</Link>
          </TableCell>

          {/* PRESCRIPTION COLUMN */}
          <TableCell className="text-center">
            {order.items?.length ? (
              order.items.map((item, idx) => (
                item.prescriptionFile ? (
                  <a
                    key={item.id || idx}
                    href={URL.createObjectURL(item.prescriptionFile)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${item.title} prescription`}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 block mb-1"
                  >
                    {item.title} Prescription
                  </a>
                ) : (
                  <span key={item.id || idx} className="text-gray-500 block mb-1">
                    {item.title}: No Prescription
                  </span>
                )
              ))
            ) : (
              <span className="text-gray-400">No Items</span>
            )}
          </TableCell>

          {/* Actions */}
          <TableCell className="text-right flex justify-end">
            <div className="flex items-center">
              <PrintReceipt orderId={order._id} />
              <span className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                <Link to={`/order/${order._id}`}>
                  <Tooltip id="view" Icon={FiZoomIn} title="View Invoice" bgColor="#059669" />
                </Link>
              </span>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default OrderTable;
