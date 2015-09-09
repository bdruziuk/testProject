(function() {
    'use strict';

    angular.module('app.components.gridSample').factory('gridSampleService', function($http, $resource) {
        function getData(start, count) {
            var url = "/~api/grid/sample";
            var dataSettings = $resource(url, {start: start, count: count}).query().$promise;
            return dataSettings;
        }

        return {
            getData: getData
        };
    });

})();