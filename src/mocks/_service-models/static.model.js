angular.module('app').service('staticModel', function() {
	var data = [{
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
	}];

	this.getData = function() {
		return data;
	}

});