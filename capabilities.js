require('dotenv').config(); //remotely inject the environment variables!
const capability = {
	"browserName": "Chrome",
	"browserVersion": "dev",
	"LT:Options": {
		"username": process.env.LAMBDATEST_USERNAME,
		"accessKey": process.env.LAMBDATEST_ACCESS_KEY,
		"platformName": "Windows 10",
        "build": "Lambda Test Suite",
		"w3c": true,
        "name": "testNameGoesHere",
		"plugin": "node_js-node_js"
	}
}

module.exports = {
    capability
}