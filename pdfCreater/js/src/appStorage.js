const Storage = require('@google-cloud/storage')
const fs= require('fs');
const UUID = require('uuid/v4')

const storage= new Storage({
    projectId: '<projectId>',
    keyFilename: '../extras/serviceAccountKey.json'
});

const bucketName = '<BUCKETNAME>';

var uploadFile = function (srcLocalFile) {
    return new Promise(function (resolve,reject) {


    console.log('Uploading...')
    let uuid = UUID();
    storage
        .bucket(bucketName)
        .upload(srcLocalFile,{
            metadata: {
                contentType: 'text/pdf',
                metadata: {
                    firebaseStorageDownloadTokens: uuid
                }
            }
        })
        .then((data) => {
            console.log(`${srcLocalFile} uploaded to ${bucketName}.`);
            let file = data[0];
            var str = "https://firebasestorage.googleapis.com/v0/b/" + bucketName + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid;
            resolve(str)
        }).catch(err => {
            console.error('ERROR:', err);
            reject(err);
        });
    })
}

//uploadFile('../extras/DataFile.pdf');

module.exports ={
    uploadFile : uploadFile
}