angular.module('app').service('gridModel', function ($filter) {

    var generateData = function () {
        // default model
        var data = [];

        //generate random data array
        for(var i = 1; i < 1000; i++) {
            data.push({
                id: i,
                value: i + "test"
            });
        }

        return data;
    }

    var getDataInterval = function (data, interval) {
        if(interval) {
            if(!interval.start) interval.start = 0;
            if(!interval.count) interval.count = 20;

            return data.splice(interval.start, interval.count);
        }
        else return data;
    };

    var filterData = function (data, filter) {

        if(typeof(filter) !== 'undefined')
            return $filter('filter')(data, filter);
        else return data;

    };

    var sortData = function (data, sorting) {

        if(sorting && sorting.direction) {

            if(!sorting.direction) sorting.direction = 'asc';
            if(!sorting.field) sorting.field = 'id';

            var reverse = (sorting.direction == 'asc') ? true : false;

            return $filter('orderBy')(data, sorting.field, reverse);
        }
        else return data;
    };

    this.getData = function (settings) {

        var data = generateData();
        var filteredData = filterData(data, settings.filter);
        var sortedData = sortData(filteredData, settings.sorting);
        var len = sortedData.length;
        var partData = getDataInterval(sortedData, settings.interval);

        return [{items: partData, totalCount: len}];
    };
});