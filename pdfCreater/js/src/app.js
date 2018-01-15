var storage = require('./appStorage')
var table = require('./table')
var database = require('./appDatabase')



var initiate = function () {

    var filepath = "../extras/DataFile.pdf"
    table.createTable(filepath)
        .then(function (filepath) {
            storage.uploadFile(filepath)
                .then(function (downloadURL){
                    database.setUrl(downloadURL)
            })
        }).catch(err => {
        console.error('ERROR:', err)
        })

}

initiate();

