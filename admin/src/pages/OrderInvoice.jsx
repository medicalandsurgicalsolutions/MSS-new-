import dayjs from "dayjs";
import { useParams } from "react-router";
import ReactToPrint from "react-to-print";
import React, { useContext, useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import { IoCloudDownloadOutline } from "react-icons/io5";
import {
  TableCell,
  TableHeader,
  Table,
  TableContainer,
  WindmillContext,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { PDFDownloadLink } from "@react-pdf/renderer";

//internal import
import useAsync from "@/hooks/useAsync";
import Status from "@/components/table/Status";
import OrderServices from "@/services/OrderServices";
import Invoice from "@/components/invoice/Invoice";
import Loading from "@/components/preloader/Loading";
import logo from "@/assets/img/logo/logo-color.png";
import PageTitle from "@/components/Typography/PageTitle";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import InvoiceForDownload from "@/components/invoice/InvoiceForDownload";

const OrderInvoice = () => {
  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);
  const { id } = useParams();
  const printRef = useRef();

  const { data, loading, error } = useAsync(() =>
    OrderServices.getOrderById(id)
  );

  const {
    currency,
    globalSetting,
    numberToWords,
    capitalizeFirstLetter,
    showDateFormat,
    getNumberTwo,
  } = useUtilsFunction();

  return (
    <>
      <PageTitle> {t("InvoicePageTittle")} </PageTitle>

      <div
        ref={printRef}
        className="bg-white dark:bg-gray-800 mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden"
      >
        {!loading && (
          <>
            <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 dark:border-gray-700 dark:text-gray-300">
              <h1 className="font-bold font-serif text-xl uppercase">
                <h2 className="w-24 h-20">
                  <img src={logo} alt="Logo" width="110" />
                </h2>
                {t("InvoicePageTittle")}
              </h1>

              <div className="sm:text-right lg:text-right text-left">
                <p className="text-sm text-black dark:text-gray-400 mt-2">
                  {globalSetting?.shop_name} <br />
                  {globalSetting?.address} <br />
                  {globalSetting?.contact} <br />{" "}
                  <span> {globalSetting?.email} </span> <br />
                  {globalSetting?.website}
                </p>
              </div>
            </div>

            <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
              <div className="mb-3 flex flex-col">
                <span className="font-bold font-serif text-sm uppercase text-black dark:text-gray-500">
                  {t("InvoiceDate")}
                </span>
                <span className="text-sm text-black dark:text-gray-400">
                  {showDateFormat(data?.createdAt)}
                </span>
              </div>

              <div className="mb-3 flex flex-col">
                <span className="font-bold font-serif text-sm uppercase text-black dark:text-gray-500">
                  {(data?.user_info?.city?.toLowerCase().trim() || "") ===
                  "delhi"
                    ? "GST No"
                    : "IGST No"}
                </span>
                <span className="text-sm text-black dark:text-gray-400">
                  {globalSetting?.vat_number}
                </span>
              </div>

              <div className="mb-3 flex flex-col">
                <span className="font-bold font-serif text-sm uppercase text-black dark:text-gray-500">
                  Drug License No
                </span>
                <span className="text-sm text-black dark:text-gray-400">
                  PTG-149905 (21),PTG-149904 (20)
                </span>
              </div>

              <div className="mb-3 flex flex-col">
                <span className="font-bold font-serif text-sm uppercase text-black dark:text-gray-500">
                  {t("InvoiceNo")}
                </span>
                <span className="text-sm text-black dark:text-gray-400">
                  #{data?.invoice}
                </span>
              </div>

              <div className="flex flex-col sm:text-right lg:text-right text-left">
                <span className="font-bold font-serif text-sm uppercase text-black dark:text-gray-500">
                  Customer Name
                </span>
                <span className="text-sm text-black dark:text-gray-400">
                  Mr./Mrs. {data?.user_info?.name} <br />
                  {data?.user_info?.email} <br />
                  {data?.user_info?.contact} <br />
                  {data?.user_info?.flat},{" "}
                  {data?.user_info?.address?.substring(0, 30)} <br />
                  {data?.user_info?.landmark}, {data?.user_info?.city} <br />
                  {data?.user_info?.district}, {data?.user_info?.state},{" "}
                  {data?.user_info?.country}, {data?.user_info?.zipCode}
                </span>
              </div>
            </div>
          </>
        )}

        <div>
          {loading ? (
            <Loading loading={loading} />
          ) : error ? (
            <span className="text-red-500 text-center mx-auto">{error}</span>
          ) : (
            <TableContainer className="my-8">
              <Table>
                <TableHeader>
                  <tr className="bg-white">
                    <TableCell className="text-black">{t("Sr")}</TableCell>
                    <TableCell className="text-center text-black">HSN</TableCell>
                    <TableCell className="text-center text-black">
                      Reference No
                    </TableCell>
                    <TableCell className="text-center text-black">
                      Product Title
                    </TableCell>
                    <TableCell className="text-center text-black">
                      {t("Quantity")}
                    </TableCell>
                    <TableCell className="text-center text-black">
                      {t("ItemPrice")}
                    </TableCell>
                    <TableCell className="text-right text-black">
                      {t("Amount")}
                    </TableCell>
                  </tr>
                </TableHeader>

                <Invoice
                  data={data}
                  currency={currency}
                  getNumberTwo={getNumberTwo}
                />
              </Table>
            </TableContainer>
          )}
        </div>

        {!loading && (
          <div className="border rounded-xl border-gray-100 p-8 py-6 bg-white dark:bg-gray-900 dark:border-gray-800">
            <div className="flex lg:flex-row md:flex-row flex-col justify-between">

              <div className="flex flex-col mb-3">
                <span className="font-bold text-sm uppercase text-black dark:text-gray-500">
                  {t("InvoicepaymentMethod")}
                </span>
                <span className="font-semibold text-sm text-black dark:text-gray-400">
                  {data.paymentMethod}
                </span>
              </div>

              {data.paymentMethod === "Cash" && (
                <div className="flex flex-col mb-3">
                  <span className="font-bold text-sm uppercase text-black dark:text-gray-500">
                    COD Charge
                  </span>
                  <span className="font-semibold text-sm text-black dark:text-gray-400">
                    {currency}60
                  </span>
                </div>
              )}

              <div className="flex flex-col mb-3">
                <span className="font-bold text-sm uppercase text-black dark:text-gray-500">
                  {t("ShippingCost")}
                </span>
                <span className="font-semibold text-sm text-black dark:text-gray-400">
                  {currency}
                  {getNumberTwo(data.shippingCost)}
                </span>
              </div>

              <div className="flex flex-col mb-3">
                <span className="font-bold text-sm uppercase text-black dark:text-gray-500">
                  {t("InvoiceDicount")}
                </span>
                <span className="font-semibold text-sm text-black dark:text-gray-400">
                  {currency}
                  {getNumberTwo(data.discount)}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-sm uppercase text-black dark:text-gray-500">
                  {t("InvoiceTotalAmount")}
                </span>
                <span className="text-xl font-bold text-black dark:text-emerald-500">
                  {currency}
                  {getNumberTwo(
                    Math.floor(data.total) +
                      (data.total % 1 >= 0.5 ? 1 : 0)
                  )}
                </span>
              </div>

            </div>

            <div className="w-full text-right font-serif font-semibold text-black dark:text-gray-400 mt-2">
              {capitalizeFirstLetter(
                numberToWords(
                  getNumberTwo(
                    Math.floor(data.total) +
                      (data.total % 1 >= 0.5 ? 1 : 0)
                  )
                )
              )}{" "}
              Only
            </div>
          </div>
        )}
      </div>

      {!loading && (
        <div className="mb-4 mt-3 flex justify-end">
          <PDFDownloadLink
            document={
              <InvoiceForDownload
                t={t}
                data={data}
                currency={currency}
                getNumberTwo={getNumberTwo}
                showDateFormat={showDateFormat}
                globalSetting={globalSetting}
                numberToWords={numberToWords}
                capitalizeFirstLetter={capitalizeFirstLetter}
              />
            }
            fileName="Invoice"
          >
            {({ loading }) =>
              loading ? (
                "Loading..."
              ) : (
                <button className="flex items-center text-sm font-medium px-5 py-2 rounded-md text-white bg-emerald-500 hover:bg-emerald-600">
                  Download Invoice
                  <span className="ml-2 text-base">
                    <IoCloudDownloadOutline />
                  </span>
                </button>
              )
            }
          </PDFDownloadLink>

          <ReactToPrint
            trigger={() => (
              <button className="ml-3 flex items-center text-sm px-5 py-2 rounded-md text-white bg-emerald-500 hover:bg-emerald-600">
                {t("PrintInvoice")}
                <span className="ml-2">
                  <FiPrinter />
                </span>
              </button>
            )}
            content={() => printRef.current}
            documentTitle="Invoice"
          />
        </div>
      )}
    </>
  );
};

export default OrderInvoice;
