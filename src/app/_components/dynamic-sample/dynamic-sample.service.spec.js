(function() {
	"use strict";
	
	describe("dynamic sample service", function () {
		var dynamicSampleService, httpBackend;
	
		beforeEach(module("app"));
	
		beforeEach(inject(function (_dynamicSampleService_, $httpBackend) {
			dynamicSampleService = _dynamicSampleService_;
			httpBackend = $httpBackend;
	    
		    httpBackend.whenGET("/~api/dynamic/sample").respond({
		        data: [{
		        	id: 1,
		        	value: 'One'
		        }, {
		        	id: 2,
		        	value: 'Two'
		        }, {
		        	id: 3,
		        	value: 'Three'
		        }]
		    });
		}));
	  
		afterEach(function() {
			httpBackend.verifyNoOutstandingExpectation();
			httpBackend.verifyNoOutstandingRequest();
		});
	
		it("should return 3 items on query", function () {
			dynamicSampleService.query().$promise.then(function(data) {
				expect(data.length).toEqual(3);
			});
		});
	  
		it("should post the data for saving", function () {
			httpBackend.expect('POST', '/~api/dynamic/sample/1', {id: 1, value: 'One'}).respond(200, 'Done');
		  
			dynamicSampleService.save({id: 1, value: 'One'});
			httpBackend.flush();
		});
	});
})();