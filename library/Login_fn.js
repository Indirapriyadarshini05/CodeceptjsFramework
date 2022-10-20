const { I } = inject();

async function Login(username, password) {
  await I.amOnPage(`${process.env.URL}/auth/login`);
  //await I.resizeWindow(1366, 768);
  await I.waitForElement('//input[@name="username"]', 20);
  await I.fillField('//input[@name="username"]', username);
  await I.fillField('//input[@placeholder="Password"]', password);
}

async function dropdown(fieldname, role) {
  // Click on Userrole dropdown and selecting user role as ESS
  let urole =
    "//label[text()='" +fieldname +"']/../..//div[@class='oxd-select-text-input']";
  I.waitForElement("//label[text()='" + fieldname + "']");
  I.click(urole);
  I.click(
    "//label[text()='" + fieldname + "']/../..//span[text()='" + role + "']"
  );
}
/*async function clickadmin(value){
  I.click("//span[text()='"+value+"']");
  I.see("System Users");
  I.addButton();
  I.see("Add User");
}*/

async function names(fieldname,empName) {
  // Enter Employeename
  await I.fillField("//label[text()='"+fieldname+"']/../..//input", empName);
}
// async function Employeename(empName) {
//   // Enter Employeename
//   await I.fillField("//label[text()='Employee Name']/../..//input", empName);
// }
// async function username(nameofuser) {
//   let uname =
//     "//label[text()='Username']/../..//input[@class='oxd-input oxd-input--active']";
//   await I.fillField(uname, nameofuser);
// }

async function admin(psdvalue) {
  // Enter Password,Confirm password
  await I.fillField('//label[text()="Password"]/../..//input', psdvalue);
  await I.fillField(
    '//label[text()="Confirm Password"]/../..//input',
    psdvalue
  );
}


async function leave(fieldname, value) {
  //Show Leave with Status,Leave Type
  await I.click(
    '//label[text()="' +fieldname +'"]/../..//div[@class="oxd-select-text-input"]' );
  await I.click('//span[text()="' + value + '"]');
}

async function leave_checkbox() {
  await I.click(
    '//span[@class="oxd-switch-input oxd-switch-input--active --label-right"]'
  );
}

async function job(value) {
  await I.click('//span[text()="' + value + '"]');
  await I.waitForElement('//ul[@class="oxd-dropdown-menu"]', 5);
}

async function jobDropdown(ddname) {
  let title = '//a[text()="' + ddname + '"]';
  await I.click(title);
}
async function textfield(fieldname, value) {
  I.fillField('//label[text()="' + fieldname + '"]/../..//input', value);
}
async function textArea(fieldname, value) {
  let area ='//label[text()="'+fieldname+'"]/../..//textarea';
  await I.clearField(area);
  await I.fillField(area, value);
}

async function jobTitlesUserAdd(username) {
  // Title
  await I.see("Add Job Title");
  let jobtitle ='//label[text()="Job Title"]/../..//input[@class="oxd-input oxd-input--active"]';
  await I.fillField(jobtitle, username);

  // Description
  let description = '//textarea[@placeholder="Type description here"]';
  await I.fillField(description, "User job title description");
  await I.wait(2);
  // Attaching file
  let attach = '//div[text()="Browse"]/../..//input';
  await I.attachFile(attach, "/input/png.png");
  I.wait(2);
  // User Add note
  let addnote = '//textarea[@placeholder="Add note"]';
  I.fillField(addnote, "User job title notes for reference");
}

async function attachingFile(value,inputfile){

   let attach = '//div[text()="'+value+'"]/../..//input';
   let input = '/input/'+inputfile+'';
   await I.attachFile(attach,input);
   I.wait(2);

  // let attach = '//div[text()="Browse"]/../..//input';
  // await I.attachFile(attach, "/input/importData.csv");

}

async function savebutton(value) {
  await I.click('//button[text()="' + value + '"]');
}

// async function Successmessage(value) {

//   let success = await I.grabTextFrom('//p[text()="' + value + '"]');
//   return success;
//   // success.should.be.eql("Successfully Saved");


// }
async function titlesTable(value) {
  await I.waitForElement('//div[text()="' + value + '"]', 10);
  let val = await I.grabTextFrom('//div[text()="' + value + '"]');
  console.log(val);
}
async function checkbox(value) {
  
  await I.checkOption('//input[@type="' + value + '"]');
  await I.wait(5);
   let deleteSelected = await I.grabTextFrom("//button[text()=' Delete Selected ']");
  deleteSelected.should.be.eql(' Delete Selected ');
  await I.uncheckOption('//input[@type="' + value + '"]');
}

async function tableAscendingDecending(value) {
  let sort = '//div[@class="oxd-table-header-sort"]';
  await I.click(sort);
  await I.click('//span[text()="' + value + '"]');
  await I.wait(5);

}
// async function griddata(value){
// let uname='//div[@class="oxd-table-cell oxd-padding-cell"]//div[text()="'+value+'"]'
// //await I.waitForElement(uname);
// I.wait(10);
// await I.grabTextFromAll(uname);
// uname.should.be.eql(value);
// }
async function TimeSelection(fieldname,hours,ampm) {
  // let timehour="//div[@role='alert']/../..//input[@class='oxd-input oxd-input--active oxd-time-hour-input-text']"
  //let timeminute ='//div[@role="alert"]/../..//input[@class="oxd-input oxd-input--active oxd-time-minute-input-text"]'
  let timehour =
    '(//div[@class="oxd-time-hour-input"]/../..//input)[2]';
  let timeminute =
    '(//div[@class="oxd-time-hour-input"]/../..//input)[3]';
    let uparrow='//i[@class="oxd-icon bi-chevron-up oxd-icon-button__icon oxd-time-minute-input-up"]';
   // let downarrow='//i[@class="oxd-icon bi-chevron-up oxd-icon-button__icon oxd-time-minute-input-up"]';
  await I.click("//label[text()='" + fieldname + "']/../..//input");
  I.wait(5);
  I.waitForElement(timehour,10);
  await I.click(timehour);
  await I.clearField(timehour);
  await I.waitForElement(timehour,10);
  await I.fillField(timehour, hours);
  await I.wait(5);
  await I.click(timeminute);
  await I.wait(2);
  await I.clearField(timeminute);
  await I.wait(2);
  await I.click(uparrow);
 // I.click(downarrow)
 await I.forceClick("//label[text()='"+ampm+"']");
 I.wait(5);
 
}
async function Duration(fieldname){
let dayDuration= await I.grabTextFrom('//label[text()="'+fieldname+'"]/../..//p');
console.log(dayDuration);
}

async function handleDownloads(filename){
  await I.wait(10);
  await I.handleDownloads("downloads/"+filename+"");
  await I.waitForElement('//a[text()="Download"]',20);
  await I.click('//a[text()="Download"]');
  await I.wait(10);
  // await I.fileImport(filename);
  // await I.wait(5);

}




module.exports = {
  structureAdd:structureAdd,
  Login: Login,
  admin: admin,
  //records: records,
  leave: leave,
  leave_checkbox:leave_checkbox,
  jobDropdown: jobDropdown,
  titlesTable: titlesTable,
  jobTitlesUserAdd: jobTitlesUserAdd,
  //Successmessage: Successmessage,
  //sucessfullyUpdated:sucessfullyUpdated,
  savebutton: savebutton,
  dropdown: dropdown,
  //username: username,
  // clickadmin:clickadmin,
 // Employeename: Employeename,
 names:names,
  checkbox: checkbox,
  tableAscendingDecending: tableAscendingDecending,
  //griddata:griddata,
  job: job,
  textfield: textfield,
  TimeSelection: TimeSelection,
  Duration:Duration,
  //fileImport:fileImport,
  //checkAdult:checkAdult
  handleDownloads:handleDownloads,
  textArea:textArea,
  attachingFile:attachingFile,
};
