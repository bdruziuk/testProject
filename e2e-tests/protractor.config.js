exports.config = {
	chromeDriver: '../node_modules/protractor/selenium/chromedriver.exe',
	seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar', 
	specs: [
	    '../e2e-tests/features/**/*.feature'
    ],
    capabilities: {
		'browserName': 'chrome'
    },
    baseUrl: 'http://localhost:9000',
    framework: 'cucumber',
    cucumberOpts: {
    	require: 'features/steps/*.steps.js',
    	format: 'pretty'
    }
};