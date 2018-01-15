var firebase = require('firebase');

firebase.initializeApp({
    "service-account": "./google-services.json",
    "databaseURL": "<DATABASE_URL>"
});

//firebase database reference
var mDatabaseRef= firebase.database().ref();

//Node names
var parent_node 	= "user_files/"
var pdf_node 	= "pdf/"

var getParentRef	= function(){
    return mDatabaseRef.child(parent_node);
}

var getPDFRef	= function(){
    return mDatabaseRef.child(parent_node+pdf_node)
}

//sets request object
function setUrl(url){
    console.log('Setting Url..')
    getPDFRef().push().set({
        "url": url
    });
}

module.exports ={
    setUrl: setUrl
};