angular.module('app').service('gridModel', function () {

    function generateData() {
        // default model
        var data = [];

        //generate random data array
        for(var i = 1; i < 1000; i++) {
            data.push({
                id: i,
                value: i + " test"
            });
        }

        //shuffle data
        /*for (var j = 0; j < data.length - 1; j++) {
            var k = j + Math.floor(Math.random() * (data.length - j));
            var temp = data[k];

            data[k] = data[j];
            data[j] = temp;
        }*/

        return data;
    }

    function getDataInterval(data, interval) {
        if(interval) {
            if(!interval.start) interval.start = 0;
            if(!interval.count) interval.count = 20;

            return data.splice(interval.start, interval.count);
        }
        else return data;
    };

    function filterData(data, filter) {
        if(typeof(filter) !== 'undefined' && filter.length > 0) {

            var filteredData = data.filter(function(item) {

                var flag = filter.every(function(element, index) {
                    if(item[element.field].toString().includes(element.value)) return true;
                    else return false;
                });

                if (flag) return item;
            });

            return filteredData;
        }
        else return data;
    };

    function sortData(data, sorting) {

        if(sorting && sorting.direction) {

            if(!sorting.direction) sorting.direction = 'asc';
            if(!sorting.field) sorting.field = 'id';

            data.sort(function (first, second) {

                var firstVal = first[sorting.field];
                var secondVal = second[sorting.field];

                if(!isNaN(first[sorting.field]) && !isNaN(second[sorting.field])) {
                    firstVal = parseInt(first[sorting.field]);
                    secondVal = parseInt(second[sorting.field]);
                }

                if (firstVal < secondVal)
                    return -1;
                if (firstVal > secondVal)
                    return 1;
                return 0;
            });

            if (sorting.direction == 'desc') data.reverse();

            return data;
        }
        else return data;
    };

    this.getData = function (settings) {

        var data = generateData();
        var filteredData = filterData(data, settings.filter);
        var sortedData = sortData(filteredData, settings.sorting);
        var partData = getDataInterval(sortedData, settings.interval);
        var len = filteredData.length;

        return [{items: partData, totalCount: len}];
    };
});