(function() {
    'use strict';

    angular
        .module('app.components.gridSample')
        .constant('gridSampleConfig',{})
        .controller('GridSampleController', function($scope,gridSampleConfig, gridSampleService,$timeout) {
            //for private use
            var _currentPage = 0;
            var _recordTotalCount = 0;
            
            var vm = angular.extend(this,gridSampleConfig);

            vm.gridOptions = {
                columnDefs: [
                    {
                        field: 'id',
                        name: 'Id'
                    },
                    {
                        field: 'value',
                        name: 'Value'
                    }
                ],
                enableSorting: true,
                enableFiltering: true,
                useExternalSorting:true,
                useExternalFiltering: true,
                infiniteScrollDown: true,
                //add handlers for events from grid 
                onRegisterApi: function(gridApi){
                  vm.gridApi = gridApi;
                  vm.gridApi.infiniteScroll.on.needLoadMoreData($scope, vm.getNextPage);
                  vm.gridApi.core.on.filterChanged($scope,vm.onFilterChanged);
                  vm.gridApi.core.on.sortChanged($scope, vm.onSortChanged);
                }
            };

            vm.gridRequestSettings = {
                filter: {},//array of filters for remote filtering  as // { filed: 'id',value: '2'}
                sorting: {}, //config for sorting as {direction:"ASC",field:"id"}
                interval: {start: 0,count: 50}// config for infinitive scroll ,define start position 
                                                //and amount of records to load
            }; 
            /**
             calls to get next page on infinity scroll
            **/
            vm.getNextPage = function(){
                _currentPage++;
                var reqCfg = vm.gridRequestSettings;
                var startPosition = _currentPage * reqCfg.interval.count;
                reqCfg.interval.start = (startPosition);

                gridSampleService.getData(vm.gridRequestSettings).then(function(data) {
                    vm.gridApi.infiniteScroll.saveScrollPercentage();
                    vm.gridOptions.data = vm.gridOptions.data.concat(data[0].items);
                    var isContunieScrolling = vm.gridOptions.data.length < _recordTotalCount;
                    vm.gridApi.infiniteScroll.dataLoaded(false,isContunieScrolling);
                 });
            };
            /**
                calls to get first portiion of data for grid
            **/
            vm.getFirstData = function() {
                  gridSampleService.getData(vm.gridRequestSettings).then(function(data) {
                     vm.gridOptions.data = data[0].items;
                     _recordTotalCount = data[0].totalCount;
                  });
            };
            /**
               calls to perform remote filtering
            **/
            vm.onFilterChanged = function(){
                if (angular.isDefined(vm.filterTimeout)) {
                    $timeout.cancel(vm.filterTimeout);
                }

                var grid = this.grid;
                var columns = grid.columns;
                var paramsObj = {};

                for(var i = 0; i < columns.length; i++){

                    if(columns[i]){
                        var col = columns[i];

                        if(col.filters){
                            var f = col.filters[0];

                            if(f && f.term && f.term.length > 0) paramsObj[col.field] = f.term;
                        }
                    }
                }

                vm.gridRequestSettings.filter = paramsObj;
                console.log(vm.gridRequestSettings.filter);

                vm.gridRequestSettings.interval.start = 0;
                _currentPage = 0;
               
                //set timeout to prevent trigger request due to ofthen typing in input
                vm.filterTimeout = $timeout(function() {
                    gridSampleService.getData(vm.gridRequestSettings).then(function(data) {
                        _recordTotalCount = data[0].totalCount;
                        vm.gridOptions.data = data[0].items;
                        vm.gridApi.infiniteScroll.resetScroll(false, vm.gridOptions.data.length < _recordTotalCount);
                    });
                  }, 500);
            };
            /**
                calls to perform remote sorting
            **/
            vm.onSortChanged = function ( grid, sortColumns ) {

                if(sortColumns.length > 0){
                    var direction = sortColumns[0].sort.direction;
                    var columnName = sortColumns[0].name;
                    vm.gridRequestSettings.sorting.direction = direction;
                    vm.gridRequestSettings.sorting.field = columnName;
                }
                else{ //discard sorting
                    vm.gridRequestSettings.sorting.direction = "";
                    vm.gridRequestSettings.sorting.field = "";
                }

                vm.gridRequestSettings.interval.start = 0;
                _currentPage = 0;

                gridSampleService.getData(vm.gridRequestSettings).then(function(data) {
                    _recordTotalCount = data[0].totalCount;
                    vm.gridOptions.data = data[0].items;
                    vm.gridApi.infiniteScroll.resetScroll(false, vm.gridOptions.data.length < _recordTotalCount);
                   
                });
            };
            
            /***
             calls to destory timeout on scope destroy 
            **/
            $scope.$on("$destroy", function (event) {
                if (angular.isDefined(vm.filterTimeout)) {
                    $timeout.cancel(vm.filterTimeout);
                }
            });

            vm.getFirstData();
        })
        .directive('gridSample', function () {
            return {
                restrict: 'EA',
                scope: {},
                controller: 'GridSampleController',
                controllerAs: 'vmCtrl',
                bindToController: true,
                templateUrl: 'app/_components/grid-sample/grid-sample.template.html'
            };
        });
})();