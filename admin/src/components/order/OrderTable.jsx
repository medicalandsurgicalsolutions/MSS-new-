import { TableBody, TableCell, TableRow, Badge } from "@windmill/react-ui";

import { useTranslation } from "react-i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";

//internal import

import Status from "@/components/table/Status";
import Tooltip from "@/components/tooltip/Tooltip";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import PrintReceipt from "@/components/form/others/PrintReceipt";
import SelectStatus from "@/components/form/selectOption/SelectStatus";
import SelectDate from "@/components/form/selectOption/SelectedDate";
import SelectInput from "../form/selectOption/SelectInput";
import TrackInput from "../form/selectOption/TrackInput";
import SelectPartner from "../form/selectOption/SelectPartner";

const OrderTable = ({ orders }) => {
  // console.log('globalSetting Orders', orders)
  const { t } = useTranslation();
  const { showDateTimeFormat, currency, getNumberTwo } = useUtilsFunction();

  // console.log('orders',orders)

  return (
    <>
      <TableBody className="dark:bg-gray-900">
        {orders?.map((order, i) => (
          <TableRow key={i + 1}>
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
              <span className="text-sm">{order?.user_info?.name}</span>{" "}
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {order?.paymentMethod}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {currency}
                {getNumberTwo(Math.floor(order?.total) + (order?.total % 1 >= 0.5 ? 1 : 0))}
              </span>
            </TableCell>

            <TableCell>
                <span className="text-sm font-semibold">
                    <SelectDate id={order._id} order={order} />
                </span>
            </TableCell>

            <TableCell>
                <span className="text-sm font-semibold">
                    <SelectPartner id={order._id} order={order} />
                </span>
            </TableCell>

            <TableCell>
                <span className="text-sm font-semibold">
                    <SelectInput id={order._id} order={order} />
                </span>
            </TableCell>

            <TableCell>
                <span className="text-sm font-semibold">
                    <TrackInput id={order._id} order={order} />
                </span>
            </TableCell>

            <TableCell className="text-xs">
              <Status status={order?.status} />
            </TableCell>

            <TableCell className="text-center">
            {order.isCancelByCustomer ? (
              order.paymentMethod == "RazorPay" ? (
                <Badge type="success">Refunded</Badge>
              ): (
                <Badge type="success">Cancelled</Badge>
              )
            ) : (
              <SelectStatus id={order._id} order={order} />
            )}
            </TableCell>

            {console.log("Prescription column rendering for order:", order?._id, order?.prescriptionUrl)}
            <TableCell className="text-center">
              {order?.prescriptionUrl ? (
                  <a
                    href={order.prescriptionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline"
                  >
                    View
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm">No file</span>
                )}
              </TableCell>

              
            <TableCell className="text-center">
                  <Link to={`/shipping/${order._id}`}>
                    View
                  </Link>
            </TableCell>

            <TableCell className="text-right flex justify-end">
              <div className="flex justify-between items-center">
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
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
