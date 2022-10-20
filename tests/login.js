const { dataTable } = require("codeceptjs");
const { dateselection } = require("../library/Login_fn");
const assert = require("chai").assert;
const should = require("chai").should();
const chance = require("chance").Chance();
const nameofuser = chance.name({ length: 5 });
const password = chance.string({
  alpha: true,
  symbols: true,
  length: 8,
  numeric: true,
});
const hour = chance.hour();
const number = chance.natural({ min: 1, max: 15 });
const shortid = require("shortid");
const email = chance.email({ domain: "example.com" });
const address = chance.address({ short_suffix: true });
const city = chance.city();
const state = chance.state({ territories: true, country: "us" });
const zip = chance.zip({ plusfour: true });
const sentence = chance.sentence({ words: 3 });
const word = chance.word({ length: 5 });

Feature("Login to OrangeHRM");

Scenario("Verify Title", async ({ I }) => {
  I.amOnPage(`${process.env.URL}/auth/login`);
  let title = await I.grabTitle();
  console.log(title);
  title = await title.should.eql("OrangeHRM");
}).tag("title");

Scenario("Login to OrangeHRM", async ({ I, LP }) => {
  await I.amOnPage(`${process.env.URL}/auth/login`);
  await I.waitForElement('//input[@name="username"]', 20);
  await LP.Login(process.env.login_Username, process.env.login_Password);
  await I.submitbutton();
  I.see("Employee Information");
}).tag("login");

Scenario("Add User in Admin-system Users", async ({ I, LP, admin }) => {
  await I.amOnPage(`${process.env.URL}/auth/login`);
  // I.waitForElement('//input[@name="username"]', 20);
  await LP.Login(process.env.login_Username, process.env.login_Password);
  await I.submitbutton();
  await admin.admintab("Admin");
  await I.addButton();
  await LP.dropdown("User Role", "ESS");
  await LP.dropdown("Status", "Enabled");
  await LP.names("Employee Name", nameofuser);
  await LP.names("Username", nameofuser);
  await LP.admin(password);
  await I.submitbutton();
}).tag("admin");

let table = new DataTable(["Username", "Userrole", "EmpName", "Status"]);
table.add([nameofuser, "ESS", nameofuser, "Enabled"]); // adding records to a table
Data(table)
  .Scenario(
    "User search in Admin-System Users ",
    async ({ I, LP, current, admin }) => {
      I.amOnPage(`${process.env.URL}/auth/login`);
      //I.waitForElement('//input[@name="username"]', 20);
      await LP.Login(process.env.login_Username, process.env.login_Password);
      await I.submitbutton();
      await admin.admintab("Admin");
      await I.see("System Users");
      await LP.names("Username", nameofuser);
      await LP.dropdown("User Role", current.Userrole);
      await LP.dropdown("Status", current.Status);
      await LP.names("Employee Name", nameofuser);
      //await LP.dropdown('User Role','Admin')
      //await LP.dropdown('Status','Enabled')

      await I.submitbutton();
      let info = await I.grabTextFrom("//p[text()='No Records Found']");
      console.log(info);
      info.should.be.eql("No Records Found");
    }
  )
  .tag("recordsearch");

//Job Dropdown
Scenario("Add User in Job-Job Title", async ({ I, LP, admin }) => {
  await I.amOnPage(`${process.env.URL}/auth/login`);
  //I.waitForElement('//input[@name="username"]', 20);
  await LP.Login(process.env.login_Username, process.env.login_Password);
  await I.submitbutton();
  await admin.admintab("Admin");
  await LP.job("Job ");
  await LP.jobDropdown("Job Titles");
  await I.see("Job Titles");
  await I.addButton();
  await LP.jobTitlesUserAdd(nameofuser);
  await LP.savebutton(" Save ");

  let successmsg = await LP.Successmessage("Successfully Saved");
  successmsg.should.be.eql("Successfully Saved");
  console.log(nameofuser);
  //await LP.griddata(nameofuser);
}).tag("Adduser");

Scenario(
  "Admin job-job title records table header",
  async ({ I, LP, admin }) => {
    await I.amOnPage(`${process.env.URL}/auth/login`);
    //I.waitForElement('//input[@name="username"]', 20);
    await LP.Login(process.env.login_Username, process.env.login_Password);
    await I.submitbutton();
    await admin.admintab("Admin");
    await LP.job("Job ");
    await LP.jobDropdown("Job Titles");
    await I.waitForElement('//div[@class="orangehrm-container"]');
    await I.seeElement('//div[@class="orangehrm-container"]');
    await I.wait(5);
    await LP.checkbox("checkbox");
    await LP.tableAscendingDecending("Decending");
    await LP.tableAscendingDecending("Ascending");
  }
).tag("jobtitleheader");

Scenario("Pay Grades", async ({ I, LP, admin }) => {
  await I.amOnPage(`${process.env.URL}/auth/login`);
  //I.waitForElement('//input[@name="username"]', 20);
  await LP.Login(process.env.login_Username, process.env.login_Password);
  await I.submitbutton();
  await admin.admintab("Admin");
  await LP.job("Job ");
  await LP.jobDropdown("Pay Grades");
  await I.see("Pay Grades");
  await I.addButton();
  await LP.textfield("Name", nameofuser);
  await I.wait(2);
  await I.savebutton("Add Pay Grade", " Save ");
  let message = await LP.Successmessage("Successfully Saved");
  message.should.be.eql("Successfully Saved");

  // Add currency
  await I.waitForElement("//h6[text()='Currencies']", 10);
  await I.see("Currencies");
  await I.addButton();
  await I.see("Add Currency");
  // await I.wait(2);
  await LP.dropdown("Currency", "INR - Indian Rupee");
  await LP.textfield("Minimum Salary", "1000");
  await LP.textfield("Maximum Salary", "10000");
  // await I.wait(2);
  await I.savebutton("Add Currency", " Save ");
  let message1 = await LP.Successmessage("Successfully Saved");
  message1.should.be.eql("Successfully Saved");
}).tag("pay");

Scenario("Employment Status", async ({ I, LP, admin }) => {
  await I.amOnPage(`${process.env.URL}/auth/login`);
  //I.waitForElement('//input[@name="username"]', 20);
  await LP.Login(process.env.login_Username, process.env.login_Password);
  await I.submitbutton();
  await admin.admintab("Admin");
  await LP.job("Job ");
  await LP.jobDropdown("Employment Status");
  await I.see("Employment Status");
  await I.addButton();
  await LP.textfield("Name", nameofuser);
  await I.savebutton("Add Employment Status", " Save ");
  //await I.submitbutton();
  let Successmsg = await LP.Successmessage("Successfully Saved");
  Successmsg.should.be.eql("Successfully Saved");
}).tag("Estatus");

Scenario("Job Category", async ({ I, LP, admin }) => {
  await I.amOnPage(`${process.env.URL}/auth/login`);
  //I.waitForElement('//input[@name="username"]', 20);
  await LP.Login(process.env.login_Username, process.env.login_Password);
  await I.submitbutton();
  await admin.admintab("Admin");
  await LP.job("Job ");
  await LP.jobDropdown("Job Categories");
  await I.see("Job Categories");
  await I.addButton();
  await I.see("Add Job Category");
  await LP.textfield("Name", nameofuser);
  //await I.submitbutton();
  await I.savebutton("Add Job Category", " Save ");
  let Successmsg = await LP.Successmessage("Successfully Saved");
  Successmsg.should.be.eql("Successfully Saved");
}).tag("Jcategory");

Scenario("Work Shifts", async ({ I, LP, admin }) => {
  await I.amOnPage(`${process.env.URL}/auth/login`);
  //I.waitForElement('//input[@name="username"]', 20);
  await LP.Login(process.env.login_Username, process.env.login_Password);
  await I.submitbutton();
  await admin.admintab("Admin");
  await LP.job("Job ");
  await LP.jobDropdown("Work Shifts");
  await I.see("Work Shifts");
  await I.addButton();
  await I.see("Add Work Shift");
  await LP.textfield("Shift Name", word);
  await I.see("Working Hours");
  await I.wait(5);
  let hours = hour.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  await LP.Duration("Duration Per Day");
  await LP.TimeSelection("From", hours, "PM");
  await LP.TimeSelection("To", hours, "AM");
  await LP.Duration("Duration Per Day");
  await LP.textfield("Assigned Employees", nameofuser);
  // await I.submitbutton();
  await I.savebutton("Add Work Shift", " Save ");
  await I.wait(2);
  let message4 = await LP.Successmessage("Successfully Saved");
  message4.should.be.eql("Successfully Saved");
}).tag("Wshift");

//Organization
Scenario("Organization-Generalshifts", async ({ I, LP, admin }) => {
  let id = shortid.generate();
  await I.amOnPage(`${process.env.URL}/auth/login`);
  await I.waitForElement('//input[@name="username"]', 20);
  await LP.Login(process.env.login_Username, process.env.login_Password);
  await I.submitbutton();
  await admin.admintab("Admin");
  await LP.job("Organization ");
  await LP.jobDropdown("General Information");
  await I.see("General Information");
  await I.checkBox();
  await I.clearFieldaValue('Organization Name');
  await LP.textfield("Organization Name", "OrangeHRM.PVT.LTD");
  await LP.textfield("Registration Number", number);
  await LP.textfield("Tax ID", id);
  await LP.textfield("Phone", number);
  await LP.textfield("Fax", number);
  await I.clearFieldaValue('Email');
  await LP.textfield("Email", email);
  await LP.textfield("Address Street 1", address);
  await LP.textfield("Address Street 2", address);
  await LP.textfield("City", city);
  await LP.textfield("State/Province", state);
  await LP.textfield("Zip/Postal Code", zip);
  await LP.dropdown("Country", "United States");
  await LP.notes('Notes', sentence);
  //await I.savebutton('General Information',' Save ');
   await I.submitbutton();
   let success= await LP.Successmessage("Successfully Updated");
  success.should.be.eql("Successfully Updated");
}).tag("GI");

Scenario("Leave-Search Employee in Leave List", async ({ I, LP }) => {
  I.amOnPage(`${process.env.URL}/auth/login`);
  //I.waitForElement('//input[@name="username"]', 20);
  await LP.Login(process.env.login_Username, process.env.login_Password);
  await I.submitbutton();
  I.click("//a[@class='oxd-main-menu-item']/../..//span[text()='Leave']");
  I.see("Leave List");
  await I.calendarDate("From Date", "2021-10-10");
  await I.calendarDate("To Date", "2022-01-01");
  await LP.leave("Show Leave with Status", "Scheduled");
  await LP.leave("Leave Type", "CAN - Matternity");
  await LP.names("Employee Name", nameofuser);
  await LP.leave("Sub Unit", "Engineering");
  await LP.leave_checkbox();
  await I.submitbutton();
}).tag("leave");


/*Scenario("Pim - Data Import", async ({ I, LP }) => {
  await I.amOnPage(`${process.env.URL}/auth/login`);
  await I.waitForElement('//input[@name="username"]', 20);
  await LP.Login(process.env.login_Username, process.env.login_Password);
  I.wait(5);
  await I.submitbutton();
  await LP.job("Configuration ");
  let title = '//a[text()="Data Import"]';
  await I.click(title);
  //await LP.jobDropdown('Data Import');
  await I.handleDownloads("/downloads/importData.csv");
  I.waitForElement('//a[text()="Download"]', 20);
  await I.click('//a[text()="Download"]');
  await I.fileImport();
  await I.wait(10);
  // await I.forceClick('//a[text()="Download"]');
  // await I.wait(10);
  // await  FileSystem.amInPath('output/downloads');
  // await I.wait(5);
  // await FileSystem.waitForFile('downloads/importData.csv', 5);
  // await  FileSystem.seeFile('importData.csv');

  // await I.seeFile('codecept.conf.js')
  // await I.seeInThisFile('FileSystem');
  // await I.dontSeeInThisFile("WebDriverIO");

  /* let data=[];
  new File(fileParts, importData, [I]);
  let reader=new FileReader();
  reader.onload=function(){
    console.log(this.result);
  }
reader.readAsText(file)

  // const download = await Promise.all([
  // I.waitForElement('//a[text()="Download"]', {timeout:100000}),
  // I.forceClick('//a[text()="Download"]'),
  // console.log(download),
  // ]);
}).tag("pim");*/
