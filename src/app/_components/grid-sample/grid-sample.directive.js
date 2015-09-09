(function() {
    'use strict';

    angular
        .module('app.components.gridSample')
        .constant('gridSampleConfig', {

        })
        .controller('GridSampleController', function(gridSampleConfig, gridSampleService) {
            var vm = angular.extend(this, gridSampleConfig);

            vm.gridOptions = {
                columnDefs: [
                    {
                        field: 'id',
                        name: 'Id'},
                    {
                        field: 'value',
                        name: 'Value'}
                ],
                enableSorting: false,
                infiniteScrollDown: true,

            };

            loadData();

            function loadData() {
                gridSampleService.getData(1,10).then(function(data) {
                    vm.gridOptions.data = data;
                });
            }
        })
        .directive('gridSample', function () {
            return {
                restrict: 'EA',
                scope: {
                },
                controller: 'GridSampleController',
                controllerAs: 'vm',
                bindToController: true,
                templateUrl: 'app/_components/grid-sample/grid-sample.template.html'
            };
        });
})();