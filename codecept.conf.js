const { setHeadlessWhen, setCommonPlugins } = require("@codeceptjs/configure");
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);
require("dotenv").config();
// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: "./*_test.js",
  output: "./output",
  helpers: {
    Playwright: {
      url: "http://localhost",
      show: true,
      browser: "chromium",
    },

    Helpers: {
      require: "./helpers_helper.js",
  },

  FileSystem: {},
},


  include: {
    I: "./steps_file.js",
    LP: "./library/Login_fn.js",
    admin: "./pages/admin.js",
  },


  name: "CodeceptjsFramework",

  plugins: {
    allure: {
      enabled: true,
      outputDir: "./output/Allure",

    },
  },

    autoDelay: {
      enabled: true,
    },
  
};
