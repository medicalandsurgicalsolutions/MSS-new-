require("dotenv").config();
const { connectDB } = require("../config/db");

const Staff = require("../models/Staff");
const staffData = require("../utils/staffs");

const Customer = require("../models/Customer");
const customerData = require("../utils/customers");

const Coupon = require("../models/Coupon");
const couponData = require("../utils/coupon");

const Product = require("../models/Product");
const productData = require("../utils/products");

const Order = require("../models/Order");
const orderData = require("../utils/orders");

const Category = require("../models/Category");
const categoryData = require("../utils/categories");

const Language = require("../models/Language");
const languageData = require("../utils/language");

const Currency = require("../models/Currency");
const currencyData = require("../utils/currency");

const Attribute = require("../models/Attribute");
const attributeData = require("../utils/attributes");

const Setting = require("../models/Setting");
const settingData = require("../utils/settings");


const Permission = require("../models/Permission");
const PermissionData = require("../utils/permissions");

const Admin = require("../models/Admin");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const { ADMIN_ROLE_ID, ADMIN_STAFF_ID } = require("../utils/admin");





connectDB();
const importData = async () => {
  try {
    await Language.deleteMany();
    await Language.insertMany(languageData);

    await Currency.deleteMany();
    await Currency.insertMany(currencyData);

    // await Attribute.deleteMany();
    // await Attribute.insertMany(attributeData);

    // await Customer.deleteMany();
    // await Customer.insertMany(customerData);

    // await Staff.deleteMany();
    // await Staff.insertMany(staffData);

    // await Category.deleteMany();
    // await Category.insertMany(categoryData);

    // await Product.deleteMany();
    // await Product.insertMany(productData);

    // await Coupon.deleteMany();
    // await Coupon.insertMany(couponData);

    // await Order.deleteMany();
    // await Order.insertMany(orderData);

    // await Setting.deleteMany();
    // await Setting.insertMany(settingData);


    await Permission.deleteMany();
    await Permission.insertMany(PermissionData);

    const permissions = await Permission.find({});

    const adminPermissions = [];
    permissions.map(p => {
      adminPermissions.push(p._id);
    })

    await Role.deleteMany();
    const role = await Role.create({
      _id : ADMIN_ROLE_ID,
      name: {
        en: "Super Admin"
      },
      permissions: adminPermissions
    });


    await Staff.deleteMany();
    const staff = await Staff.create({
        _id: ADMIN_STAFF_ID,
        name: {
          en: "Aman Kumar Yadav",
        },
        image: "https://i.ibb.co/d294W8Y/team-4.jpg",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("aman@123B"),
        phone: "708-628-3122",
        joiningData: new Date(),
        role: role._id
    });
    

    // console.log("data inserted successfully!");
    process.exit();
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

importData();
