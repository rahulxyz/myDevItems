const Storage =require('@google-cloud/storage');
const firebase = require("firebase");
const storage= Storage({
    keyFilename: '../extras/serviceAccountKey.json'
});

const bucketname = '<BucketName>'

var config = {
    apiKey: "<Api-Key>",
    authDomain: "<authDomain>",
    databaseURL: "<databaseURL>"
};

firebase.initializeApp(config);

module.exports ={
    firebase: firebase,
    storage : storage,
    bucketname : bucketname
}