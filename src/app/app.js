(function() {
	'use strict';
	
	var appDependencies = ['ngResource', 'ui.router', 'app.components', 'app.sample', 'ui.grid', 'ui.grid.infiniteScroll'];
	
	if (angular.mock) {
		appDependencies.push('ngMockE2E');
	} 
	angular.module('app', appDependencies); // TODO :: Change the app name to appropriate application

})();