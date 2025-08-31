require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
// const http = require("http");
// const { Server } = require("socket.io");

const { connectDB } = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const customerRoutes = require("../routes/customerRoutes");
const adminRoutes = require("../routes/adminRoutes");
const orderRoutes = require("../routes/orderRoutes");
const customerOrderRoutes = require("../routes/customerOrderRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const couponRoutes = require("../routes/couponRoutes");
const pincodeRouters = require("../routes/pincodeRouters");
const attributeRoutes = require("../routes/attributeRoutes");
const settingRoutes = require("../routes/settingRoutes");
const currencyRoutes = require("../routes/currencyRoutes");
const languageRoutes = require("../routes/languageRoutes");
const notificationRoutes = require("../routes/notificationRoutes");
const departmentRoutes = require("../routes/departmentRoutes");
const roleAndPermissionRoutes = require("../routes/roleAndPermissionRoutes");
const brandRoutes = require("../routes/brandRoute");
const clientRoutes = require("../routes/clientRoutes");
const awardRoutes = require("../routes/awardRoutes");
const blogRoutes = require("../routes/blogRoutes");
const partnerRoutes = require("../routes/partnerRoutes");
const ratingRoutes = require("../routes/ratingRoutes");
const csvUploadRoutes = require("../routes/csvUploadRoutes");
const { isAuth, isAdmin } = require("../config/auth");
const uploadRoutes = require("../routes/uploadRoutes");

// const {
//   getGlobalSetting,
//   getStoreCustomizationSetting,
// } = require("../lib/notification/setting");

connectDB();
const app = express();

// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
// app.enable('trust proxy');
app.set("trust proxy", 1);

app.use(express.json({ limit: "4mb" }));
app.use(helmet());
app.options("*", cors()); // include before other routes
app.use(cors());

//root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});

//this for route will need for store front, also for admin dashboard
app.use("/api/upload", uploadRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/category/", categoryRoutes);
app.use("/api/coupon/", couponRoutes);
app.use("/api/customer/", customerRoutes);
app.use("/api/order/", isAuth, customerOrderRoutes);
app.use("/api/attributes/", attributeRoutes);
app.use("/api/setting/", settingRoutes);
app.use("/api/currency/", isAuth, currencyRoutes);
app.use("/api/language/", languageRoutes);
app.use("/api/notification/", isAuth, notificationRoutes);
app.use("/api/department/", departmentRoutes);
app.use("/api/role/", roleAndPermissionRoutes);
app.use("/api/brand/", brandRoutes);
app.use("/api/pincode/", pincodeRouters);
app.use("/api/client/", clientRoutes);
app.use("/api/award/", awardRoutes);
app.use("/api/blog/", blogRoutes);
app.use("/api/partner/", partnerRoutes);
app.use("/api/rating/", ratingRoutes);
app.use("/api/uploads/", csvUploadRoutes);

//if you not use admin dashboard then these two route will not needed.
app.use("/api/admin/", adminRoutes);
app.use("/api/orders/", orderRoutes);

//Admin Build
const adminBuildPath = path.join(__dirname, "admin/build");
app.use("/admin",express.static(adminBuildPath));

//admin Routing 
app.get("/admin/*",(req,res)=>{
  res.sendFile(path.join(adminBuildPath,"index.html"));
})

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

// Serve static files from the "dist" directory
app.use("/static", express.static("public"));

// Serve the index.html file for all routes
app.get("*", (req, res) => {
  if (req.path.startsWith('/admin')) {
    res.sendFile(path.join(__dirname, '../admin/build/index.html'));
  } else if (req.path.startsWith('/api/')) {
    res.status(404).json({ message: 'API route not found' });
  } else {
    res.send(`
      <h1>MSS Backend Server</h1>
      <p><a href="/admin">Admin Panel</a></p>
      <p><a href="http://localhost:3000">Store (Separate Port)</a></p>
    `);
  }
});

const PORT = process.env.PORT || 5000;

// const server = http.createServer(app);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// set up socket
// const io = new Server(server, {
//   cors: {
//     origin: [
//       "http://localhost:3000",
//       "http://localhost:4100",
//       "https://admin-kachabazar.vercel.app",
//       "https://dashtar-admin.vercel.app",
//       "https://kachabazar-store.vercel.app",
//       "https://kachabazar-admin.netlify.app",
//       "https://dashtar-admin.netlify.app",
//       "https://kachabazar-store-nine.vercel.app",
//     ], //add your origin here instead of this
//     methods: ["PUT", "GET", "POST", "DELETE", "PATCH", "OPTIONS"],
//     credentials: false,
//     transports: ["websocket"],
//   },
// });

// io.on("connection", (socket) => {
//   // console.log(`Socket ${socket.id} connected!`);

//   socket.on("notification", async (data) => {
//     console.log("data", data);
//     try {
//       let updatedData = data;

//       if (data?.option === "storeCustomizationSetting") {
//         const storeCustomizationSetting = await getStoreCustomizationSetting(
//           data
//         );
//         updatedData = {
//           ...data,
//           storeCustomizationSetting: storeCustomizationSetting,
//         };
//       }
//       if (data?.option === "globalSetting") {
//         const globalSetting = await getGlobalSetting(data);
//         updatedData = {
//           ...data,
//           globalSetting: globalSetting,
//         };
//       }
//       io.emit("notification", updatedData);
//     } catch (error) {
//       console.error("Error handling notification:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log(`Socket ${socket.id} disconnected!`);
//   });
// });
// server.listen(PORT, () => console.log(`server running on port ${PORT}`));
