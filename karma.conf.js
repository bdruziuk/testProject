// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-02-05 using
// generator-karma 0.9.0
module.exports = function(config) {
	'use strict';

	config.set({
		autoWatch: false,
		basePath: '',
		frameworks: ['jasmine'],

		files: [
		    // bower:js
		    'src/bower_components/angular/angular.js',
		    'src/bower_components/angular-resource/angular-resource.js',
		    'src/bower_components/angular-ui-grid/ui-grid.js',
		    'src/bower_components/ui-router/release/angular-ui-router.js',
		    'src/bower_components/angular-mocks/angular-mocks.js',
		    // endbower
		    // injector:js
		    'src/app/app.js',
		    'src/app/_components/components.module.js',
		    'src/app/_components/dynamic-sample/dynamic-sample.module.js',
		    'src/app/_components/grid-sample/grid-sample.module.js',
		    'src/app/_components/static-sample/static-sample.module.js',
		    'src/app/_header/header.module.js',
		    'src/app/sample/sample.module.js',
		    'src/app/app.config.js',
		    'src/app/sample/sample.config.js',
		    'src/app/_components/dynamic-sample/dynamic-sample.directive.js',
		    'src/app/_components/grid-sample/grid-sample.directive.js',
		    'src/app/_components/static-sample/static-sample.directive.js',
		    'src/app/_components/dynamic-sample/dynamic-sample.service.js',
		    'src/app/_components/grid-sample/grid-sample.service.js',
		    'src/app/_components/static-sample/static-sample.service.js',
		    'src/app/_header/header.controller.js',
		    'src/app/sample/sample.controller.js',
		    'src/app/_components/dynamic-sample/dynamic-sample.service.spec.js',
		    'src/app/_components/grid-sample/grid-sample.service.spec.js',
		    'src/app/_components/static-sample/static-sample.service.spec.js',
		    // endinjector
		],
		exclude: [
		],

		port: 9998,
		browsers: ['PhantomJS'],

		phantomjsLauncher: {
			exitOnResourceError: true
		},
    
		plugins: [
		    'karma-phantomjs-launcher',
		    'karma-jasmine',
		    'karma-coverage',
		    'karma-ng-html2js-preprocessor',
		    'karma-jshint-preprocessor'
		],

		reporters: ['progress', 'coverage'],

		preprocessors: {
			"src/app/**/*.template.html": ["ng-html2js"],
			'src/app/**/!(*spec|*mock).js': ['jshint', 'coverage']
		},

		ngHtml2JsPreprocessor: {
			moduleName: 'app',
			stripPrefix: 'src/'
		},
		coverageReporter: {
			dir: 'test-results/coverage/',
			reporters: [{ 
				type: 'html', subdir: 'report-html' 
			}, { 
				type: 'cobertura', subdir: '.', file: 'cobertura.xml' 
			}, { 
				type: 'lcovonly', subdir: '.', file: 'lcov.info' 
			}]
		},
		colors: true,
		logLevel: config.LOG_INFO
  });
};
