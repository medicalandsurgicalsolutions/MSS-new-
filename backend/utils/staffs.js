const bcrypt = require("bcryptjs");
const staffs = [
  {
    name: {
      en: "Admin",
    },
    image: "https://i.ibb.co/d294W8Y/team-4.jpg",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("aman@123B"),
    phone: "708-628-3122",
    joiningData: new Date(),
  }
];

module.exports = staffs;
