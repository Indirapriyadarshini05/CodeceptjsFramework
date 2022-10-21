const { dateselection } = require("../library/Login_fn");
const chance = require("chance").Chance();
const number =chance.natural({min: 1, max: 5});
Feature(" Importing data ");

Scenario("PIM", async ({ I, LP }) => {
  
  let filename="importdata"+number+".csv";
  await I.amOnPage(`${process.env.URL}/auth/login`);
  //await I.waitForElement('//input[@name="username"]', 20);
  await LP.Login("Admin", "admin123");
  await I.submitbutton();
  await LP.job("Configuration ");
  await LP.jobDropdown("Data Import");
  let dataImport="//div[@class='orangehrm-information-card-container']/../..//ul/li";
  let text= await I.grabTextFromAll(dataImport);
  console.log(text);
  await LP.handleDownloads(filename);
  await I.fileImport(filename);
 // await I.wait(5);
  await LP.attachingFile('Browse','importData.csv');
  //await I.wait(5);
  await I.submitbutton();
 
}).tag("import");


