// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({
    projectId: '<YourProjectID>',
    keyFilename: './serviceAccountKey.json'
});


const bucketName = 'e-cell2.appspot.com';
uploadFile();

function downloadFile() {
    const srcFilename = 'sample.csv';
    const destFilename = './sample3.csv';

    const options = {
        // The path to which the file should be downloaded, e.g. "./file.txt"
        destination: destFilename,
    };

// Downloads the file
    storage
        .bucket(bucketName)
        .file(srcFilename)
        .download(options)
        .then(() => {
            console.log(
                `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
            );
        })
        .catch(err => {
            console.error('ERROR:', err);
        });

}

function uploadFile() {
    const filename = './sample.csv';

    storage
        .bucket(bucketName)
        .upload(filename)
        .then(() => {
            console.log(`${filename} uploaded to ${bucketName}.`);
            downloadFile();
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}