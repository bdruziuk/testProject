angular.module('app').service('dynamicModel', function() {
	var data = [];
	
	var getElementIndex = function(id) {
    	for (index = 0; index < data.length; index++) {
    		if (data[index].id == id) {
    			return index;
    		}
    	}
    	return -1;
    }
	
	this.getData = function() {
		return data;
	}
	
	this.addElement = function(payload) {
    	data.push(payload);
    }
    
    this.deleteElement = function(id) {
    	var index = getElementIndex(id);
    	if (index != -1) {
    		data.splice(index, 1);
    	}
    }
});