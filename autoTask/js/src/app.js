const appStorage = require('./appStorage')


const srcPath= 'csvFiles/autoTask.xlsx'
const destPath = '../downloadedContent/autoTask.xlsx'
appStorage.downloadFile(srcPath,destPath)


