import {
  FiGrid,
  FiUsers,
  FiUser,
  FiCompass,
  FiSettings,
  FiSlack,
  FiGlobe,
  FiTarget,
  FiStar,
  FiCornerLeftDown,
} from "react-icons/fi";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard",
    icon: FiGrid,
    name: "Dashboard",
    permission: "dashboard",
  },
  {
    path: "/roles-and-permission",
    icon: FiUser, // icon
    name: "Role & Permission",
    permission: "role",
  },
  {
    icon: FiSlack,
    name: "Catalog",
    routes: [
      // {
      //   path: "/departments",
      //   name: "Departments",
      //   permission: "department"
      // },
      {
        path: "/brands",
        name: "Brands",
        permission: "department",
      },
      {
        path: "/categories",
        name: "Categories",
        permission: "category",
      },
      {
        path: "/pincode",
        name: "Pincode",
        permission: "pincode",
      },
      {
        path: "/products",
        name: "Products",
        permission: "product",
      },
      {
        path: "/attributes",
        name: "Attributes",
        permission: "attribute",
      },
      {
        path: "/coupons",
        name: "Coupons",
        permission: "coupon",
      },
      {
        path: "/award",
        name: "Award",
        permission: "award",
      },
      {
        path: "/blogs",
        name: "Blog",
        permission: "blog",
      },
      {
        path: "/clients",
        name: "Our Client",
        permission: "client",
      },
      {
        path: "/partners",
        name: "Our Partner",
        permission: "partner",
      },
    ],
  },

  {
    path: "/customers",
    icon: FiUsers,
    name: "Customers",
    permission: "customer",
  },
  {
    path: "/orders",
    icon: FiCompass,
    name: "Orders",
    permission: "order",
  },
  {
    path: "/ratings",
    icon: FiStar,
    name: "Ratings",
    permission: "order",
  },
  {
    path: "/our-staff",
    icon: FiUser,
    name: "OurStaff",
    permission: "staff",
  },
  {
    path: "/settings?settingTab=common-settings",
    icon: FiSettings,
    name: "Settings",
    permission: "settings",
  },
  {
    path: "/imports",
    icon: FiCornerLeftDown,
    name: "Bulk Imports",
    permission: "import",
  },
  {
    icon: FiGlobe,
    name: "International",
    routes: [
      {
        path: "/languages",
        name: "Languages",
        permission: "language",
      },
      {
        path: "/currencies",
        name: "Currencies",
        permission: "currency",
      },
    ],
  },
  {
    icon: FiTarget,
    name: "OnlineStore",
    routes: [
      {
        name: "ViewStore",
        path: "http://localhost:3000",
        outside: "store",
      },

      {
        path: "/store/customization",
        name: "StoreCustomization",
        permission: "store_customize",
      },
      {
        path: "/store/store-settings",
        name: "StoreSettings",
        permission: "store_setting",
      },
    ],
  },

  {
    icon: FiSlack,
    name: "Pages",
    routes: [
      // submenu

      {
        path: "/404",
        name: "404",
      },
      {
        path: "/coming-soon",
        name: "Coming Soon",
      },
    ],
  },
];

export default sidebar;
