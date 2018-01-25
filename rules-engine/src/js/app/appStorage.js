const Storage = require('@google-cloud/storage')
const fs = require('fs')
const rules = require('./rules')

const storage= new Storage({
    projectId: '<Project_ID>',
    keyFilename: 'src/js/extras/serviceAccountKey.json'
});

const bucketName = '<Bucket_Name>';

//downloads rules
function downloadFile(fact) {
    const srcFile= 'rules/rulesFile.json'
    const destName = 'src/js/extras/rulesFile.json'

    const options ={
        destination : destName
    }

    storage.bucket(bucketName)
        .file(srcFile)
        .download(options)
        .then(()=>{
            console.log('Rules Downloaded');
            readFile('src/js/extras/rulesFile.json',fact)
        })
        .catch(err=>{
            console.log("error: "+err);
        });

}

//reads downloaded rules and starts rule-enging
function readFile(filename,fact){
    fs.readFile(filename, function (err, store) {
        if (err) {
            return console.error(err);
        }else {
            console.log("Rules Fetched.")
            rules.run(fact,store.toString())
        }
    });
}

module.exports={
    downloadFile: downloadFile
}