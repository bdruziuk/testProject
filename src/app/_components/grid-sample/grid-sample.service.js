(function() {
    'use strict';

    angular.module('app.components.gridSample').factory('gridSampleService', function($http, $resource) {

        function getData(data) {
            var url = "/~api/grid/sample";
            var dataSettings = $resource(url, data).query().$promise;
            return dataSettings;
        }

        return {
            getData: getData
        };
    });

})();