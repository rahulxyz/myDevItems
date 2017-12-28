var firebase = require('firebase');

firebase.initializeApp({
	"service-account": "./google-services.json",
	"databaseURL": "YourURL"
});

//firebase database reference
var mDatabaseRef= firebase.database().ref();

//Node names
var parent_node 	= "bundleTask/"
var request_node 	= "request/"
var response_node 	= "response/"

var getParentRef	= function(){
	return mDatabaseRef.child(parent_node);
}

var getRequestRef	= function(){
	return mDatabaseRef.child(parent_node+request_node)
}

var getResponseRef	= function(){
	return mDatabaseRef.child(parent_node+response_node)
}

//read file and generate request
fs = require('fs')
var path ='./data.json'
fs.readFile(path, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  generateRequest(data)
});

//sets request object
function generateRequest(data){
	getRequestRef().set({
		"post": data
	});
}

//set listener on request add
getRequestRef().on("child_added",function(data,prevChildKey){
	var post = data.val();
	console.log("A new Request has been generated:\n"+post)
	console.log("\n Processing...");
	setTimeout(function() {  
 		   generateResponse(post);
 		   console.log("Response Generated")
	}, 5000); 	
});


//add data to respone and remove request
function generateResponse(data){
	getResponseRef().set({
		"post" : data
	});

	removeRequest();
}

//remove Request
function removeRequest(){
	console.log("Request Compeleted and Removed")
	getRequestRef().remove();
}

//fetch current Request
function getRequestData(){
	var data;
	getRequestRef().on('value',function(snapshot){
		data= snapshot.child("post").val();
	});

    return data;
}

//fetch current Response
function getResponseData(){
    var data;
    getResponseRef().on('value',function(snapshot){
        data= snapshot.child("post").val();
    });

    return data;
}

module.exports ={
	generateRequest : generateRequest,
	getRequestData : getRequestData,
    getResponseData: getResponseData
};