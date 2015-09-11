(function() {
	"use strict";
	
	describe("grid sample test", function () {
		 var gridSampleService, httpBackend;
		 var data=null;
		 
		 beforeEach(module("app"));
	
		 beforeEach(inject(function (_gridSampleService_, $httpBackend) {
		 	gridSampleService = _gridSampleService_;
		 	httpBackend = $httpBackend;
	    
		    httpBackend.whenGET("/~api/grid/sample").
		    respond(function(method, url, data, headers){
		    	debugger;
			   data=data.items;
		    });
		}));
	  
		 afterEach(function() {
		 	httpBackend.verifyNoOutstandingExpectation();
		 	httpBackend.verifyNoOutstandingRequest();
		 });
	
		 it("should return 50 items on query ", function () {
		 	gridSampleService.getData().then(function(data) {
		 		expect(data.length).toEqual(50);
		 	});
		 });
	  		
	});
})();