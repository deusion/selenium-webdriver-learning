# selenium-webdriver-learning

This is a personal learning repo for Automated UI testing using Selenium Webdriver with Mocha + Mochawesome and Chai. This is using LambdaTest Todo project.

Project currently executes 'firstTest.js' on local machine.
Executes 'secondTest.js' on Lambda Test Automation farm.

## Features
- Selenium Webdriver - Automation
- Mocha - Test Framework
- Chai - Assertion Library
- Edge Webdriver - Browser
- Mochawesome - Automation Reports

## Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Edge Browser (Can use Chrome/Firefox instead too)

## Installation
- Clone the repository:
```bash
git clone https://github.com/deusion/selenium-webdriver-learning.git
cd selenium-webdriver-learning
```

- Install dependencies:
```bash
npm install
```

- Modify '.env.example' with your access key and username from LambdaTest and rename to '.env'

## Running Tests
- Run all tests
```bash
npm test
```
- Run specific test file:
```bash
npx mocha --no-timeouts .\test\firstTest.js
```

## Test Report
After tests have run, a report is generated using Mochawesome in './test-reports/TestReport.html'. Open it in browser to view detailed run results. (Note: Default behaviour on secondTest.js is an intentional fail)

## Adding new Tests
Create a new '.js' file under 'test' folder following the same naming pattern
