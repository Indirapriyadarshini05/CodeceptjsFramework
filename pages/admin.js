const { I } = inject();

module.exports = {

   async admintab(value) {
    I.click("//span[text()='"+value+"']");
    I.see("System Users");
   }
}
