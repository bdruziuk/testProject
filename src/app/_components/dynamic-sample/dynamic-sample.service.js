(function() {
	'use strict';

	angular.module('app.components.dynamicSample').factory('dynamicSampleService', function($resource) {
		return $resource('/~api/dynamic/sample/:id', {id: "@id"});
	});
})();