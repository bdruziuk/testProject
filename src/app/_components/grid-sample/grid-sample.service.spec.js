(function() {
	"use strict";
	
	describe("grid sample test", function () {
		 var gridSampleService, httpBackend;
		 var data=null;
		 var settings={
		 	filter: [
                     {
                         filed: 'id',
                         value: '2'
                     }
                ],
                sorting: {
                    direction: 1,
                    field: "id"
                },
                interval: {
                     start: 0,
                     count: 50
                }
            };
		 beforeEach(module("app"));
	
		 beforeEach(inject(function (_gridSampleService_, $httpBackend) {
		 	gridSampleService = _gridSampleService_;
		 	httpBackend = $httpBackend;
	    
		    httpBackend.whenGET("/~api/grid/sample").
		    respond(function(method, url, data, headers){
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
	  
		// it("should post the data for saving", function () {
		// 	httpBackend.expect('POST', '/~api/dynamic/sample/1', {id: 1, value: 'One'}).respond(200, 'Done');
		  
		// 	dynamicSampleService.save({id: 1, value: 'One'});
		// 	httpBackend.flush();
		// });
	});
})();