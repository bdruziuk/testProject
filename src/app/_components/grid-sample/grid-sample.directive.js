(function() {
    'use strict';

    angular
        .module('app.components.gridSample')
        .constant('gridSampleConfig', {

        })
        .controller('GridSampleController', function($scope,gridSampleConfig, gridSampleService,$timeout) {
            var currentPage=0;
            var firstPage=1;
            var lastPage=0;
            $scope.gridOptions = {
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
                enableSorting: false,
                infiniteScrollDown: true,
                
                onRegisterApi: function(gridApi){
                  gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.getNextPage);
                  gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, $scope.getPreviousPage);
                  $scope.gridApi = gridApi;
                }
            };

            $scope.getNextPage = function(){
                currentPage++;
                $scope.settings.interval.start=(currentPage*$scope.settings.interval.count);
                gridSampleService.getData($scope.settings).then(function(data) {
                    $scope.gridApi.infiniteScroll.saveScrollPercentage();
                    $scope.gridOptions.data=$scope.gridOptions.data.concat(data[0].items); 
                    $scope.gridApi.infiniteScroll.dataLoaded()
                    .then(function() {
                            $scope.checkDataLength('up');
                            console.log( $scope.gridOptions.data.length)
                        }
                    );
                 });
            };
            
            $scope.getFirstData = function() {
                 gridSampleService.getData($scope.settings).then(function(data) {
                    lastPage=data[0].totalCount/$scope.settings.interval.count;
                    $scope.gridOptions.data = data[0].items;
                 });
            };
            $scope.settings = {
                filter: [
                    {
                        filed: 'id',
                        value: '2'
                    }
                ],
                sorting: {
                    direction: 1,
                    filed: "id"
                },
                interval: {
                     start: 0,
                     count: 50
                }
            };
            $scope.getFirstData();
        })
        .directive('gridSample', function () {
            return {
                restrict: 'EA',
                scope: true,//{},
                // controller: 'GridSampleController',
                // controllerAs: 'vm',
                // bindToController: true,
                templateUrl: 'app/_components/grid-sample/grid-sample.template.html'
            };
        });
})();