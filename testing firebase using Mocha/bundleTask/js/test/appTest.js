var assert = require('assert')
var app = require('../src/app.js')
var fs = require('fs')
var path = require('path')

//suite to test firebase realtime database
describe('Firebase Set and Get check',function () {
	var data = 'Testing Firebase'

	before(function(){
		app.generateRequest(data);
	});
	
	it('should fetch the same data that is set',function(){
		var newData = app.getRequestData();
		assert.equal(data,newData,'Request working')
	})


    it('should wait 5s and then check response',function () {
        var newData = app.getResponseData();
        setTimeout(function () {
            assert.equal(data, newData,'Response working')
        },5000)

    })



});

//test for file reader
describe('File I/O',function(){
    var filePath = path.join(__dirname, '../src/data.json');
    console.log(filePath)
	it('read test', function(done){
		fs.readFile(filePath, function(err,data){
			if(err)
				throw "Unable to read file"
            else
			done();
		})
	})
});



