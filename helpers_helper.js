const Helper = require('@codeceptjs/helper');

class Helpers extends Helper {
 
  async submitbutton (){
   await this.helpers.Playwright.click('//button[@type="submit"]');
  }

  
  async savebutton (fieldname,value){
    await this.helpers.Playwright.click("//h6[text()='"+fieldname+"']/..//button[text()='"+value+"']");
   }

  async addButton(){

    await this.helpers.Playwright.click("//button[text()=' Add ']");
  }

  async checkBox(){

    await this.helpers.Playwright.click("//input[@type='checkbox']");
  }

  async spinner(){

  await this.helpers.Playwright.waitForElement('//div[@class="oxd-loading-spinner"]',10);
  
   }
//   async clearField(value){
//   await this.helpers.Playwright.clearField('//label[text()="'+value+'"]/../..//textarea');
//  }

 async clearFieldaValue(value){

  await this.helpers.Playwright.clearField('//label[text()="'+value+'"]/../..//input');
 }

 async validationMessage(value){

  let info =  await this.helpers.Playwright.grabTextFrom("//p[text()='"+value+"']");
  return info;
 // info.should.be.eql("No Records Found");
 }



  async  calendarDate(fieldname, date) {
    date = date.split("-");
    let yearfromdate = date[0];
    console.log("year" + " " + yearfromdate);
  
    let monthfromdate = date[1];
    console.log("month" + " " + monthfromdate);
  
    let dayfromdate = date[2].replace(/^0+/, "");
    console.log("day" + " " + dayfromdate);
  
    const monthLong = new Date(date[1]).toLocaleString("en-US", {
      month: "long",
    });
    console.log(monthLong);
  
    await this.helpers.Playwright.wait(5);
    //From Date,To Date
    await this.helpers.Playwright.click('//label[text()="' +
           fieldname +'"]/../..//input[@class="oxd-input oxd-input--active"]'); // click
    await this.helpers.Playwright.click('(//p[@class="oxd-text oxd-text--p"])[1]');
    await this.helpers.Playwright.wait(5);
    // month
    await this.helpers.Playwright.click('//li[text()="' + monthLong + '"]'); // month
    await this.helpers.Playwright.scrollPageToTop();
    await this.helpers.Playwright.wait(5);
    await this.helpers.Playwright.click('(//p[@class="oxd-text oxd-text--p"])[2]');
    await this.helpers.Playwright.wait(5);
    // year
    await this.helpers.Playwright.click('//li[text()="' + yearfromdate + '"]'); // year
    await this.helpers.Playwright.wait(5);
    await this.helpers.Playwright.scrollPageToTop();
    // date
    await this.helpers.Playwright.wait(5);
    await this.helpers.Playwright.click("//div[text()='" + dayfromdate + "']"); // date
    await this.helpers.Playwright.scrollPageToTop();
  }

  async  fileImport(templatename){
    await this.helpers.FileSystem.amInPath('/output/downloads');
    await this.helpers.Playwright.wait(5);
    await this.helpers.FileSystem.waitForFile(templatename, 5);
    await this.helpers.FileSystem.seeFile(templatename);
    let downloadedFile=await this.helpers.FileSystem.grabFileNames('/downloads/"'+templatename+'"');
    await this.helpers.FileSystem.waitForFile(templatename,5);
    console.log(downloadedFile);
   //return downloadedFile;
   
    
  }
}
module.exports = Helpers;
