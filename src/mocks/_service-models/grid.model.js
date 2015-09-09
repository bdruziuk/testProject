angular.module('app').service('gridModel', function () {
    // default model
    var data = [
        {
            id: 1,
            value: 'One'
        }, {
            id: 2,
            value: 'Two'
        }, {
            id: 3,
            value: 'Three'
        }, {
            id: 4,
            value: 'Four'
        }, {
            id: 5,
            value: 'Five'
        }, {
            id: 6,
            value: 'Six'
        }, {
            id: 7,
            value: 'Seven'
        }, {
            id: 8,
            value: 'Eight'
        }, {
            id: 9,
            value: 'Nine'
        }, {
            id: 10,
            value: 'Ten'
        },
        {
            id: 11,
            value: 'Eleven'
        }, {
            id: 12,
            value: 'Twelve'
        }, {
            id: 13,
            value: 'Thirteen'
        }, {
            id: 14,
            value: 'Fourteen'
        }, {
            id: 15,
            value: 'Fifteen'
        }, {
            id: 16,
            value: 'Sixteen'
        }, {
            id: 17,
            value: 'Seventeen'
        }, {
            id: 18,
            value: 'Eightteen'
        }, {
            id: 19,
            value: 'Nineteen'
        }, {
            id: 20,
            value: 'Twenty'
        }
    ];

    this.getData = function (start, count) {
      return data.splice(start, count);
    };
});