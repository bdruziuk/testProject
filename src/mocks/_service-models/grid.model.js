angular.module('app').service('gridModel', function () {
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
    for (var j = 0; j < data.length - 1; j++) {
        var k = j + Math.floor(Math.random() * (data.length - j));
        var temp = data[k];

        data[k] = data[j];
        data[j] = temp;
    }

    this.getData = function (start, count) {
      return data.splice(start, count);
    };
});