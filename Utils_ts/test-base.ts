import{test as testBase} from "@playwright/test";
interface TestDataForOrder {
    email: string;
    productName: string;
    password: string;
    countryName: string;
}
export const customTest = testBase.extend<{testDataForOrder:TestDataForOrder}>({
  testDataForOrder: {
    email: "melsherbiny193@gmail.com",
    productName: "ZARA COAT 3",
    password: "Kakakaka123@",
    countryName: " Egypt",
  },
});
