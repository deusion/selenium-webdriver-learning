const { Builder, By, Key } = require("selenium-webdriver"); //Used to pull the package from node module
// const assert = require("assert"); //node assert style
var should = require("chai").should(); //using chai for assertions

//describe block, describes the reasoning for the tests
describe("Testing whether adding another todo in parallel is functional", function () {

    //it block - each it block is a descriptor for the test youre doing. 
    it("successfully adds an item to application", async function () {

        //launch the browser
        let driver = await new Builder().forBrowser("MicrosoftEdge").build();

        try {
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

            // node assert
            // assert.strictEqual(todoText, "Learn Selenium");

            //assert that it should be equal to the string we want
            todoText.should.equal("Learn Selenium");

        } 
        finally {
            //close the browser
            await driver.quit();
        }
    });

    //it block - each it block is a descriptor for the test youre doing 
    it("successfully adds another item to application", async function () {

        //launch the browser
        let driver = await new Builder().forBrowser("MicrosoftEdge").build();

        try {
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

        } 
        finally {
            //close the browser
            await driver.quit();
        }
    });
});