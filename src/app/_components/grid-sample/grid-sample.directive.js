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
                enableSorting: true,
                enableFiltering:true,
                useExternalFiltering:true,
                infiniteScrollDown: true,
                //add handlers for events from grid 
                onRegisterApi: function(gridApi){
                  gridApi.infiniteScroll.on.needLoadMoreData($scope, $scope.getNextPage);
                  gridApi.infiniteScroll.on.needLoadMoreDataTop($scope, $scope.getPreviousPage);
                  gridApi.core.on.filterChanged($scope,$scope.onFilterChanged);
                  gridApi.core.on.sortChanged( $scope, $scope.onSortChanged);
                  $scope.gridApi = gridApi;
                  
                }
            };
            /**
            calls to get next page on infinity scroll
            **/
            $scope.getNextPage = function(){
                currentPage++;
                $scope.settings.interval.start=(currentPage*$scope.settings.interval.count);
                gridSampleService.getData($scope.settings).then(function(data) {
                    $scope.gridApi.infiniteScroll.saveScrollPercentage();
                    $scope.gridOptions.data=$scope.gridOptions.data.concat(data[0].items); 
                    $scope.gridApi.infiniteScroll.dataLoaded()
                 });
            };
             /**
                calls to get first portiion of data for grid
            **/
            $scope.getFirstData = function() {
                 gridSampleService.getData($scope.settings).then(function(data) {
                    lastPage=data[0].totalCount/$scope.settings.interval.count;
                    $scope.gridOptions.data = data[0].items;
                 });
            };
             /**
                calls to perform remote filtering
            **/
            $scope.onFilterChanged=function(){
                if (angular.isDefined($scope.filterTimeout)) {
                    $timeout.cancel($scope.filterTimeout);
                }   

              var grid = this.grid;
              var columns=grid.columns;
              var params=[];
              for(var i=0;i<columns.length;i++){
                    if(columns[i]){
                        var col=columns[i];
                        if(col.filters){
                            var f=col.filters[0];
                            if(f && f.term && f.term.length>0){
                                params.push({field:col.field,value:f.term})
                            }
                        }
                    }
              }
              if(params.length>0){
                $scope.settings.filter=params;
              }else{
                $scope.settings.filter=[];
              }
              $scope.settings.interval.start=0;
           
                  $scope.filterTimeout=$timeout(function() {
                  
                         gridSampleService.getData($scope.settings).then(function(data) {
                            //$scope.gridApi.infiniteScroll.saveScrollPercentage();
                            $scope.gridOptions.data=data[0].items;
                        });
                  },500);
            };
             /**
                calls to perform remote sorting
            **/
            $scope.onSortChanged = function ( grid, sortColumns ) {
                var direction=sortColumns[0].sort.direction;
                var columnName=sortColumns[0].name;
                $scope.settings.sorting.direction=direction;
                $scope.settings.sorting.field=columnName;
                $scope.settings.interval.start=0;
                gridSampleService.getData($scope.settings).then(function(data) {
                    $scope.gridOptions.data=data[0].items;
                });
            };
            /**
             settings for grid
            **/
            $scope.settings = {
                filter: [
                    // {
                    //     filed: 'id',
                    //     value: '2'
                    // }
                ],
                sorting: {
                    direction: 1,
                    field: "id"
                },
                interval: {
                     start: 0,
                     count: 50
                }
            };

            $scope.$on("$destroy", function (event) {
                if (angular.isDefined($scope.filterTimeout)) {
                    $timeout.cancel($scope.filterTimeout);
                }
            });
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