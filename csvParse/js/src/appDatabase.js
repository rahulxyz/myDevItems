var firebase = require('firebase');

firebase.initializeApp({
    "service-account": "./google-services.json",
    "databaseURL": "YourDatabaseURL"
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


//sets request object
function generateRequest(data){
    getRequestRef().push().set({
        "post": data
    });
}

//set listener on request add
getRequestRef().on("child_added",function(data,prevChildKey){
    var childData = data.val();
    console.log("\nA new Request has been generated:\n"+data.key+" "+data.val().post)
    console.log("Processing...");
    setTimeout(function() {
        generateResponse(data);
        console.log("Response Generated")
    }, 3000);

});



//add data to respone and remove request
function generateResponse(data){
    var key= data.key;
    var value = data.val().post
    console.log("Response "+key+" "+value);
        setTimeout(function () {


            getResponseRef().child(key).set({
                "post": value
            });

            removeRequest(key);
        },3000);
}

//remove Request
function removeRequest(key){
    console.log("Request Compeleted and Removed")
    getRequestRef().child(key).remove();
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