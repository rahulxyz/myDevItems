var PdfPrinter = require('pdfmake/src/printer');
var fs = require('fs');


var fonts = {
    Roboto: {
        normal: '../extras/fonts/Roboto-Regular.ttf',
        bold: '../extras/fonts/Roboto-Medium.ttf',
        italics: '../extras/fonts/Roboto-Italic.ttf',
        bolditalics: '../extras/fonts/Roboto-MediumItalic.ttf'
    }
};
var printer = new PdfPrinter(fonts);

//creates table in a pdf file with the given name and 2d array of data. First index is head, rest are individual rows
var createTable = function (filePath) {
    console.log("Creating Table...")
    return new Promise(function (resolve,reject) {

        var tableArray=[
            [{text:'User',style: 'header'},
                {text:'Project' ,style: 'header'},
                {text:'Checkin Time',style: 'header'},
                {text:'Checkout Time',style: 'header'},
                {text:'Checkin Address',style: 'header'},
                {text:'Checkout Address',style: 'header'},
                {text:'Duration (minutes)',style: 'header'}]
        ];


        for(var i=1;i<100;i++){
            tableArray[i] = ['Hari',
                'General',
                '26 Dec 17 -1:28 PM',
                '26 Dec 17 -1:29 PM',
                'Adyar FlyoverBridge, 2ndMain Rd,Gandhi Nagar,Adyar, Chennai,Tamil Nadu 600020, India',
                'Adyar Flyover Bridge, 2nd Main Rd, Gandhi Nagar, Adyar,Chennai, Tamil Nadu 600020,India',
                '1'];
        }

        var noOfColumn = tableArray[0].length;[]
        //each column size
        var width=[];
        for(var i=1;i<=noOfColumn;i++)
            width.push('auto')


        var docDef = {
        content: [
            {
                style:'tableStyle',
                layout: 'lightHorizontalLines', // optional
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: width,

                    body: tableArray
                }
            }
        ],
        styles:{
            header: {
                fontSize: 10,
                color: 'gray',
                margin: [0, 0, 0, 10]
            },
            tableStyle: {
                margin: [0, 15, 0, 15]//[l,t,r,b]
            },
        }
    };

    var pdfDoc = printer.createPdfKitDocument(docDef);
    const file= fs.createWriteStream(filePath)
    pdfDoc.pipe(file);
    pdfDoc.end();

    file.on("finish",()=>{resolve(filePath)
    console.log("File Written");
    })

    file.on("error",reject);

});

}

module.exports ={
    createTable: createTable
}



