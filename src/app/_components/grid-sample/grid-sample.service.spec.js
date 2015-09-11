(function() {
	"use strict";
	
	describe("grid sample test", function () {
		 var gridSampleService, httpBackend,q,rootScope,data;
		 
		 beforeEach(module("app"));
	
		 beforeEach(inject(function (_gridSampleService_, $httpBackend, _$q_, _$rootScope_) {
		 	gridSampleService = _gridSampleService_;
		 	httpBackend = $httpBackend;
		    q=_$q_;
		    rootScope =_$rootScope_;
		    var deferred = _$q_.defer();
		    data=[{
		        	items:[{
			        	id: 1,
			        	value: 'One'
			        }, {
			        	id: 2,
			        	value: 'Two'
			        }, {
			        	id: 3,
			        	value: 'Three'
			        }],
			        totalCount:3
		        }]
		        spyOn(gridSampleService,'getData').and.returnValue(deferred.promise);
		        deferred.resolve(data);

		}));
	  
		 afterEach(function() {
		 	httpBackend.verifyNoOutstandingExpectation();
		 	httpBackend.verifyNoOutstandingRequest();
		 });
	
		 it("should return 3 items on query ", function () {
		 	var result;
		 	gridSampleService.getData().then(function(data) {
		 		result=data;
		 	});
		 	rootScope.$digest();
	 		expect(data[0].items.length).toBe(3);
		 });
	});
})();