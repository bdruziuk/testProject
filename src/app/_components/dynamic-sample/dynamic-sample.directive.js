(function() {
    'use strict';

    angular
        .module('app.components.dynamicSample')
        .constant('dynamicSampleConfig', {
        })
        .controller('DynamicSampleController', function(dynamicSampleConfig, dynamicSampleService) {
        	var vm = angular.extend(this, dynamicSampleConfig);
        	vm.payload = {};
        	
        	function loadData() {
	        	dynamicSampleService.query().$promise.then(function(data) {
	        		vm.data = data;
	        	});
        	}
        	
        	vm.addElement = function() {
        		dynamicSampleService.save(vm.payload).$promise.then(function() {
        			vm.payload = {};
        			loadData();
        		});
        	};
        	
        	vm.deleteElement = function($index) {
        		dynamicSampleService.delete({id: vm.data[$index].id}).$promise.then(function() {
        			loadData();
        		});
        	};

        })
        .directive('dynamicSample', function() {
        	return {
        		restrict: 'EA',
        		scope: {
        		},
        		controller: 'DynamicSampleController',
        		controllerAs: 'vm',
        		bindToController: true,
        		templateUrl: 'app/_components/dynamic-sample/dynamic-sample.template.html'
        	};
        });
})();