(function() {
	"use strict";
	
	describe("static sample service", function () {
		var staticSampleService, httpBackend;
	
		beforeEach(module("app"));
	
		beforeEach(inject(function (_staticSampleService_, $httpBackend) {
			staticSampleService = _staticSampleService_;
			httpBackend = $httpBackend;
	    
		    httpBackend.whenGET("/~api/static/sample").respond({
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
			staticSampleService.getData().then(function(data) {
				expect(data.length).toEqual(3);
			});
		});
	});
})();