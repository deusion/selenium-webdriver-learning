const { Builder, By, Key } = require("selenium-webdriver"); //Used to pull the package from node module
const ltCapabilities = require("../capabilities");
// const assert = require("assert"); //node assert style
var should = require("chai").should(); //using chai for assertions

//describe block, describes the reasoning for the tests
describe("Testing whether adding another todo in parallel is functional", function () {

    var driver;

    //Get Lambdatest Username, Access Key from capabilities
    const USERNAME = ltCapabilities.capability["LT:Options"].username;
    const KEY = ltCapabilities.capability["LT:Options"].accessKey;
    //Create gridURL for the call to the automation suite
    const GRID_HOST = "hub.lambdatest.com/wd/hub";
    const gridURL = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;

    //The website we will be testing
    const testEndPoint = "https://lambdatest.github.io/sample-todo-app/";

    browsers = [
        { browser: "Chrome", bVersion: "dev", os: "Windows 10" },
        { browser: "Firefox", bVersion: "dev", os: "Windows 10" },
        { browser: "MicrosoftEdge", bVersion: "dev", os: "Windows 10" }
    ];

    browsers.forEach(({ browser, bVersion, os }) => {

        //it block - each it block is a descriptor for the test youre doing. 
        it(`successfully adds a todo for browser ${browser}, ${bVersion}, ${os}`, async function () {

            //take the passed in values of browsers and assign them to the capabilites for setting
            ltCapabilities.capability["LT:Options"].platformName = os;
            ltCapabilities.capability.browserName = browser;
            ltCapabilities.capability.browserVersion = bVersion;
            ltCapabilities.capability["LT:Options"].name = this.test.title;

            //create the driver instance using the capabilities of the test farm
            driver = new Builder()
            .usingServer(gridURL)
            .withCapabilities(ltCapabilities.capability)
            .build();

            await driver.get(testEndPoint);

            //add a todo
            await driver.findElement(By.id("sampletodotext")).sendKeys("Learn Selenium", Key.RETURN);

            //wait for the new item to show up (AngularJS takes a bit)
            await driver.sleep(1000);

            //create a variable and find the last item in the list, we get the text from it
            let todoText = await driver.findElement(By.xpath("(//li)[last()]/span")).getText().then(function (value) {
                return value
            });

            //assert that it should be equal to the string we want
            todoText.should.equal("Learn Selenium");

            //close browser after test
            await driver.quit();
        });
    });
});