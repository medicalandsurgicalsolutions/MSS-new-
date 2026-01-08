import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";
import logo from "@/assets/img/logo/logo-color.png";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

Font.register({
  family: "DejaVu Sans",
  fonts: [
    {
      src: "https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans.ttf",
    },
    {
      src: "https://kendo.cdn.telerik.com/2017.2.621/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    marginRight: 10,
    marginBottom: 20,
    marginLeft: 10,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 29,
    lineHeight: 1.5,
  },
  table: {
    display: "table",
    width: "auto",
    color: "#4b5563",
    marginRight: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 0,
    borderRadius: "8px",
    borderColor: "#e9e9e9",
    borderStyle: "solid",
    borderWidth: 0.5,
    padding: 0,
    textAlign: "left",
  },
  tableRow: {
    flexDirection: "row",
    paddingBottom: 2,
    paddingTop: 2,
    borderWidth: 0.8,
    borderColor: "#E5E7EB",
    borderBottom: 0,
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    paddingBottom: 4,
    paddingTop: 4,
    borderBottomWidth: 0.8,
    borderColor: "#E5E7EB",
  },
  tableCol: { width: "25%", textAlign: "left" },
  cell: {
    marginTop: 5,
    fontSize: 10,
    marginLeft: "13",
    marginRight: "13",
  },
  cellQty: {
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
    marginLeft: "12",
    marginRight: "12",
  },
  invoiceFirst: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 18,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottom: 1,
    borderColor: "#f3f4f6",
  },
  invoiceSecond: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: "13",
    marginRight: "13",
  },
  invoiceThird: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#f4f5f7",
    borderRadius: 12,
    marginLeft: "13",
    marginRight: "13",
  },
  title: {
    color: "#2f3032",
    fontFamily: "Open Sans",
    fontWeight: "bold",
    fontSize: 8.1,
    textTransform: "uppercase",
  },
  info: {
    fontSize: 9,
    color: "#6b7280",
  },
  totalAmount: {
    fontSize: 10,
    color: "#ef4444",
    fontFamily: "Open Sans",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "right",
  },
});

const InvoiceForDownload = ({
  data,
  currency,
  globalSetting,
  showDateFormat,
  numberToWords,
  capitalizeFirstLetter,
  getNumberTwo,
}) => {
  const { t } = useTranslation();

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER */}
        <View style={styles.invoiceFirst}>
          <View>
            <Image src={logo} style={{ width: 90 }} />
            <Text style={{ fontFamily: "Open Sans", fontWeight: "bold" }}>
              {t("invoice")}
            </Text>
            <Text style={styles.info}>Status: {data?.status}</Text>
            {globalSetting?.vat_number && (
              <Text style={styles.info}>VAT: {globalSetting?.vat_number}</Text>
            )}
          </View>

          <View style={{ textAlign: "right" }}>
            <Text style={{ fontSize: 9, color: "#888" }}>
              {globalSetting?.shop_name}{"\n"}
              {globalSetting?.address}{"\n"}
              {globalSetting?.contact}{"\n"}
              {globalSetting?.email}{"\n"}
              {globalSetting?.website}
            </Text>
          </View>
        </View>

        {/* BILL INFO */}
        <View style={styles.invoiceSecond}>
          <View style={{ width: "25%" }}>
            <Text style={styles.title}>{t("date")}</Text>
            <Text style={styles.info}>{showDateFormat(data?.createdAt)}</Text>
          </View>

          <View style={{ width: "25%" }}>
            <Text style={styles.title}>{t("InvoiceNo")}</Text>
            <Text style={styles.info}>#{data?.invoice}</Text>
          </View>

          <View style={{ width: "25%", textAlign: "right" }}>
            <Text style={styles.title}>Customer</Text>
            <Text style={{ fontSize: 9, color: "#6b7280" }}>
              Mr./Mrs. {data?.user_info?.name}{"\n"}
              {data?.user_info?.contact}{"\n"}
              {data?.user_info?.email}{"\n"}
              {data?.user_info?.address?.substring(0, 30)}{"\n"}
              {data?.user_info?.city}, {data?.user_info?.country} {data?.user_info?.zipCode}
            </Text>
          </View>
        </View>

        {/* ITEMS */}
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableCol}><Text style={styles.cell}>HSN</Text></View>
            <View style={styles.tableCol}><Text style={styles.cell}>Product</Text></View>
            <View style={styles.tableCol}><Text style={[styles.cell, { textAlign: "center" }]}>MFR</Text></View>
            <View style={styles.tableCol}><Text style={[styles.cell, { textAlign: "center" }]}>Qty</Text></View>
            <View style={styles.tableCol}><Text style={styles.cell}>{t("ItemPrice")}</Text></View>
            <View style={styles.tableCol}><Text style={[styles.cell, { textAlign: "right" }]}>{t("Amount")}</Text></View>
          </View>

          {data?.cart?.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <View style={styles.tableCol}><Text style={styles.cell}>{item.hsn || "N/A"}</Text></View>
              <View style={styles.tableCol}><Text style={styles.cell}>{item.title?.substring(0, 20)}</Text></View>
              <View style={styles.tableCol}><Text style={{ fontSize: 10, textAlign: "center" }}>{item?.brand?.name?.en || ""}</Text></View>
              <View style={styles.tableCol}><Text style={styles.cellQty}>{item.quantity}</Text></View>
              <View style={styles.tableCol}><Text style={styles.cell}>{currency}{getNumberTwo(item.price)}</Text></View>
              <View style={styles.tableCol}><Text style={[styles.cell, { color: "#ef4444", textAlign: "right" }]}>{currency}{getNumberTwo(item.price * item.quantity)}</Text></View>
            </View>
          ))}
        </View>

        {/* TOTAL DETAILS - FINAL */}
        <View style={styles.invoiceThird}>
          
          <View style={{ width: "50%" }}>
            <Text style={styles.title}>{t("InvoicepaymentMethod")}</Text>
            <Text style={{ fontSize: 10, color: "#0e9f6e" }}>
              {data?.paymentMethod}
            </Text>
          </View>

          <View style={{ width: "50%" }}>
            <Text style={styles.title}>Total</Text>
            <Text style={styles.totalAmount}>
              {currency}
              {getNumberTwo(data?.total)}
            </Text>
          </View>

        </View>

        {/* AMOUNT IN WORDS */}
        <View style={{ width: "95%", marginTop: 5 }}>
          <Text style={{ textAlign: "right", fontSize: 10 }}>
            {capitalizeFirstLetter(numberToWords(getNumberTwo(data.total)))} Only
          </Text>
        </View>

      </Page>
    </Document>
  );
};

export default InvoiceForDownload;
