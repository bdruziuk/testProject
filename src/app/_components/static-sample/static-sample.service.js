(function() {
	'use strict';

	angular.module('app.components.staticSample').factory('staticSampleService', function($http, $resource) {
		function getData() {
			var url = "/~api/static/sample";
			
			return $resource(url).query().$promise;
		}
		
		return {
			getData: getData
		};
	});
})();