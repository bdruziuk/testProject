angular.module('app').run(function($httpBackend, staticModel, dynamicModel, gridModel) {
	var logRequest = function(method, url, data) {
		console.log(method);
    	console.log(url);
        console.log(data);
	}
	var extractQueryParameters = function(url) {
		var query = {};
		var parameterString = url.split('?')[1];
		if (angular.isDefined(parameterString)) {
			var parameters = parameterString.split('&');
    	
			for (var index in parameters) {
			    var keyValues = parameters[index].split('=');
			    query[decodeURIComponent(keyValues[0])] = angular.fromJson(decodeURIComponent(keyValues[1]));
			}
		}
		return query;
	}
	
	$httpBackend.whenGET(/^app\//).passThrough();
	$httpBackend.whenGET(/^views\//).passThrough();
	
	$httpBackend.whenGET(/\/~api\/static\/sample/).respond(function(method, url, data) {
    	logRequest(method, url, data);
    	var staticList = staticModel.getData();
        return [200, staticList, {}];
    });
	$httpBackend.whenGET(/\/~api\/dynamic\/sample/).respond(function(method, url, data) {
    	logRequest(method, url, data);
    	var dynamicList = dynamicModel.getData();
        return [200, dynamicList, {}];
    });
	$httpBackend.whenPOST(/\/~api\/dynamic\/sample\//).respond(function(method, url, data) {
    	logRequest(method, url, data);
    	var payload = angular.fromJson(data);
    	dynamicModel.addElement(payload);
        return [200, null, {}];
    });
	$httpBackend.whenDELETE(/\/~api\/dynamic\/sample\/\d+/).respond(function(method, url, data) {
    	logRequest(method, url, data);
    	var id = url.split('/')[4];
    	dynamicModel.deleteElement(id);
        return [200, null, {}];
    });

	//gridList responses

	//GET
	$httpBackend.whenGET(/\/~api\/grid\/sample/).respond(function (method, url, data) {
		logRequest(method, url, data);
		var parameters = extractQueryParameters(url);
		var gridList = gridModel.getData(parameters.start - 1, parameters.count);
		return [200, gridList, {}];
	});

});