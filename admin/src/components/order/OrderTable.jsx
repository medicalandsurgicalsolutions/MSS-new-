import React from "react";
import { TableBody, TableCell, TableRow, Badge } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
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

const OrderTable = ({ orders }) => {
  const { t } = useTranslation();
  const { showDateTimeFormat, currency, getNumberTwo } = useUtilsFunction();

  return (
    <TableBody className="dark:bg-gray-900">
      {orders?.map((order, i) => {

        return (
          <TableRow key={i}>

            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {order?.invoice}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {showDateTimeFormat(order?.createdAt)}
              </span>
            </TableCell>

            <TableCell className="text-xs">
              <span className="text-sm">{order?.user_info?.name}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {order?.paymentMethod}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {currency}
                {getNumberTwo(
                  Math.floor(order?.total) +
                    (order?.total % 1 >= 0.5 ? 1 : 0)
                )}
              </span>
            </TableCell>

            <TableCell>
              <SelectDate id={order._id} order={order} />
            </TableCell>

            <TableCell>
              <SelectPartner id={order._id} order={order} />
            </TableCell>

            <TableCell>
              <SelectInput id={order._id} order={order} />
            </TableCell>

            <TableCell>
              <TrackInput id={order._id} order={order} />
            </TableCell>

            <TableCell className="text-xs">
              <Status status={order?.status} />
            </TableCell>

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

            <TableCell className="text-center">
              <Link to={`/shipping/${order._id}`}>View</Link>
            </TableCell>

            {/* Prescription View */}
            <TableCell className="text-center">
              {order?.prescriptionUrl ? (
                <a
                  href={order.prescriptionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View
                </a>
              ) : (
                <span className="text-gray-500">No Prescription</span>
              )}
            </TableCell>

            <TableCell className="text-right flex justify-end">
              <div className="flex items-center">
                <PrintReceipt orderId={order._id} />
                <span className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                  <Link to={`/order/${order._id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("ViewInvoice")}
                      bgColor="#059669"
                    />
                  </Link>
                </span>
              </div>
            </TableCell>

          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default OrderTable;
