const Storage = require('@google-cloud/storage')
const fs= require('fs');
const database = require('./appDatabase')

const storage= new Storage({
    projectId: 'YourProjectId',
    keyFilename: './serviceAccountKey.json'
});

const bucketname = 'bucketName';

function downloadFile() {
    const srcFile= 'csvFiles/sample.csv'
    const destName = './downloaded/sample.csv'

    const options ={
        destination : destName
    }

    storage.bucket(bucketname)
        .file(srcFile)
        .download(options)
        .then(()=>{
            console.log('Downlaod complete');
            readFile('sample.csv')

        })
        .catch(err=>{
            console.log("error: "+err);
        });


}

function readFile(filename){
    fs.readFile(filename, function (err, data) {
        if (err) {
            return console.error(err);
        }else {
            //console.log(data.toString())
            parse(data.toString());

        }
    });
}

//parse CSV file Line wise
function parse(data){
    var line = data.split('\n');
    var i;
    for(i in line) {
        if(line[i].toString()  != "") {
            console.log(line[i].toString())

            database.generateRequest(line[i].toString())
        }
    }

};






downloadFile();