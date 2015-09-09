angular.module('app').service('gridModel', function () {
    // default model
    var data = [];

    for(var i = 1; i < 1000; i++) {
        data.push({
            id: i,
            value: i + "test"
        });
    }

    this.getData = function (start, count) {
      return data.splice(start, count);
    };
});