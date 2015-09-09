(function() {
    'use strict';

    angular
        .module('app.components.staticSample')
        .constant('staticSampleConfig', {
        })
        .controller('StaticSampleController', function(staticSampleConfig, staticSampleService) {
        	var vm = angular.extend(this, staticSampleConfig);
        	staticSampleService.getData().then(function(data) {
        		vm.data = data;
        	});
        })
        .directive('staticSample', function() {
        	return {
        		restrict: 'EA',
        		scope: {
        		},
        		controller: 'StaticSampleController',
        		controllerAs: 'vm',
        		bindToController: true,
        		templateUrl: 'app/_components/static-sample/static-sample.template.html'
        	};
        });
})();