var firebase = require('firebase');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

firebase.initializeApp({
    "service-account": "../extras/serviceAccountKey.json",
    "databaseURL": "<DATABASE_URL>"
});

//firebase database reference
var mDatabaseRef= firebase.database().ref();

//returns reference of counter node
var getCounterRef = function () {
    return mDatabaseRef.child('counters');
}

//sets TimeStamp
var setTime = function () {
    getCounterRef().child('createdAt').set(Date.now());

}

//returns data from given url
function httpGet(theUrl)
{
    return new Promise(function (resolve,reject) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    if(xmlHttp.responseText!=null)
        resolve(xmlHttp.responseText);
    else
        reject("Data Null");
    });
}

//get url of given node. It can  be null
var getUrl = function (node) {
    //construct url, e.g. node= counter or counter/createdAt
    var base_url="https://travellive-aecf9.firebaseio.com/"
    var end_url= ".json?shallow=true"
    var return_url;
    if(node !=null)
        return_url = base_url+node+"/"+end_url;
    else
        return_url = base_url+end_url

    return return_url
}

//returns node count
var getNodeCount= function (url) {
    return new Promise(function (resolve, reject) {
        var count;
        httpGet(url).then(function (data) {
            var obj = JSON.parse(data);
            var count = Object.keys(obj).length;
            resolve(count);
        }).catch(function (err) {
            console.log("Error getNodeCount(): "+err);
        })

    })
}

//Set timestamp and sets Node count
var initiate = function () {
    setTime();

    var url =getUrl(null);
    getNodeCount(url).then(function (count) {
        console.log("Total Nodes: "+count)
        getCounterRef().child('totalNodes').set(count);
    }).catch(function (err) {
        console.log("Error initiate(): "+ err)
    })

}

initiate()

