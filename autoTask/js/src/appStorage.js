const initialize = require('./initialize')
const Excel = require('exceljs')
const storage = initialize.storage
const bucketname = initialize.bucketname
const appDatabase = require('./appDatabase')


//download file from a bucket
function downloadFile(srcPath, destPath) {
    const options ={
        destination : destPath
    }

    storage.bucket(bucketname)
        .file(srcPath)
        .download(options)
        .then(()=>{
            console.log('Download complete');
            parseExcel(destPath)
        })
        .catch(err=>{
            console.log("error: "+err);
        });

}

//parses excel file, creates list of objects, pushes them to database
function parseExcel(filename) {
    var workbook = new Excel.Workbook();

    var autotask;
    var list =[]
    workbook.xlsx.readFile(filename)
        .then(function() {

            var worksheet = workbook.getWorksheet(1);

            var i;
            for(i=2;i<=worksheet.rowCount;i++) {
                autotask = new AutoTask(
                    worksheet.getRow(i).getCell(1).value,
                    worksheet.getRow(i).getCell(2).value,
                    worksheet.getRow(i).getCell(4).value,
                    worksheet.getRow(i).getCell(5).value,
                )
                list.push(autotask);
            }
        }).then(function () {
            console.log("Parse Complete")
            appDatabase.pushData(list)
    }).then(function () {
        console.log("Finished")
    })

}


var AutoTask = class{

    constructor(id, description, baselineStart,baselineFinish){
        this.activityId = id
        this.description = description
        this.baselineStart = baselineStart
        this.baselineFinish = baselineFinish
    }
}

module.exports ={
    downloadFile : downloadFile,
}