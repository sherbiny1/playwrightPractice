const { test, expect } = require("@playwright/test");
const ExcelJS = require("exceljs");
async function writeExcel(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const workSheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(workSheet, searchText);
  const cell = workSheet.getCell(output.row, output.col + change.changeCol);
  cell.value = replaceText;
  workbook.xlsx.writeFile(filePath);
}
async function readExcel(workSheet, searchText) {
  let output = { row: -1, col: -1 };
  workSheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.col = colNumber;
      }
    });
  });
  return output;
}
// writeExcel(
//   "Banana",
//   100,
//   { changeRow: 0, changeCol: 2 },
//   "/Users/melsh/Downloads/testDataExcel.xlsx",
// );

test("download and upload from excel", async ({ page }) => {
  const filePath = "/Users/melsh/Downloads/download.xlsx";
  const textSearch = "Mango";
  const updatedValue = "350";
  await page.goto(
    "https://rahulshettyacademy.com/upload-download-test/index.html",
  );
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  await download;
  await writeExcel(
    textSearch,
    updatedValue,
    { changeRow: 0, changeCol: 2 },
    filePath,
  );
  await page.locator("#fileinput").setInputFiles(filePath);
  await expect(
    page
      .getByRole("row")
      .filter({ hasText: textSearch })
      .locator("#cell-4-undefined"),
  ).toHaveText(updatedValue);
});
