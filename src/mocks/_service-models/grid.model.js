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

        if (typeof(interval.count)!=='undefined' && typeof(interval.start)!=='undefined' ) {
           return data.splice(interval.start, interval.count);
        }
        else return data;
    };

    this.getData = function (settings) {

        var data = generateData();
        var len=data.length;
        
        if(settings.interval) {
            if(!settings.interval.start){
                settings.interval.start=0;
            }
            if(!settings.interval.count){
                settings.interval.count=20;
            }
            var data = getDataInterval(data, settings.interval);
        }

        return [{items:data,totalCount:len}];
    };
});