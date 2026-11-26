const base = require("@playwright/test");

exports.customTest = base.test.extend({
  testDataForOrder: {
    email: "melsherbiny193@gmail.com",
    productName: "ZARA COAT 3",
    password: "Kakakaka123@",
    countryName: " Egypt",
  },
});
