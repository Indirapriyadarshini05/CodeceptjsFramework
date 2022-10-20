const { dateselection } = require("../library/Login_fn");
const chance = require("chance").Chance();
const number =chance.natural({min: 1, max: 5});
Feature(" Importing data ");

Scenario("PIM", async ({ I, LP }) => {
  
  let filename="importdata"+number+".csv";
  await I.amOnPage(`${process.env.URL}/auth/login`);
  I.refreshPage();
  await I.waitForElement('//input[@name="username"]', 20);
  await LP.Login("Admin", "admin123");
  await I.submitbutton();
  await LP.job("Configuration ");
  await LP.jobDropdown("Data Import");
  await LP.handleDownloads(filename);
  let templatedata=await I.fileImport(filename);
  console.log(templatedata);
 
}).tag("import");
