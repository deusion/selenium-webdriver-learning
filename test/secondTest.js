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

    //create a new driver instance before each it block
    this.beforeEach(function () {
        ltCapabilities.capability["LT:Options"].name = this.currentTest.title;
        driver = new Builder()
            .usingServer(gridURL)
            .withCapabilities(ltCapabilities.capability)
            .build();
    });

    //close the browser after each it block
    this.afterEach(async function () {
        await driver.quit();
    });

    //it block - each it block is a descriptor for the test youre doing. 
    it("successfully adds an item to application", async function () {

        //navigate to the application
        await driver.get("https://lambdatest.github.io/sample-todo-app/");

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

    });

    //it block - each it block is a descriptor for the test youre doing 
    it("successfully adds another item to application", async function () {

        //launch the browser
        // let driver = await new Builder().forBrowser("MicrosoftEdge").build();

        //navigate to the application
        await driver.get("https://lambdatest.github.io/sample-todo-app/");

        //add a todo
        await driver.findElement(By.id("sampletodotext")).sendKeys("Learn Selenium", Key.RETURN);

        //wait for the new item to show up (AngularJS takes a bit)
        await driver.sleep(1000);

        //create a variable and find the last item in the list, we get the text from it
        let todoText = await driver.findElement(By.xpath("(//li)[last()]/span")).getText().then(function (value) {
            return value
        });


        //assert that it should be equal to the string we want, intentionally this is wrong.
        todoText.should.equal("Learn JS");

        //assert that it should be equal to the string we want, this is correct string
        // todoText.should.equal("Learn Selenium");
    });
});