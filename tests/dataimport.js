const { dateselection } = require("../library/Login_fn");
const chance = require("chance").Chance();
const assert = require("chai").assert;
const number =chance.natural({min: 1, max: 5});
const { Parser } = require('json2csv');
const csvtojsonV2 =require("csvtojson");

Feature(" Importing data ");

Scenario("PIM", async ({ I, LP }) => {
  
  let filename="importdata"+number+".csv";
  await I.amOnPage(`${process.env.URL}/auth/login`);
  await I.waitForElement('//input[@name="username"]', 20);
  await LP.Login("Admin", "admin123");
  await I.submitbutton();
  await LP.job("Configuration ");
  await LP.jobDropdown("Data Import");
  let dataImport="//div[@class='orangehrm-information-card-container']/../..//ul/li";
  let text= await I.grabTextFromAll(dataImport);
  console.log(text);
  await LP.handleDownloads(filename);
  await I.fileImport(filename);
  await LP.attachingFile('Browse','importData.csv');
  await I.submitbutton();

   let expectedFile= await csvtojsonV2().fromFile('./input/importData2.csv') ;
   let actualFile =await csvtojsonV2().fromFile(`./output/downloads/${filename}`);
   console.log(JSON.stringify(expectedFile)==JSON.stringify(actualFile));
   assert(JSON.stringify(expectedFile)==JSON.stringify(actualFile),
   `comparision is failed:actual file:${JSON.stringify(actualFile)} expectedFile:${JSON.stringify(expectedFile)}`);

}).tag("import");


