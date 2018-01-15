PDFDocument = require ('pdfkit')
var fs = require('fs')
doc = new PDFDocument
var initial= doc.x
var current_x = initial;
var current_y = doc.y;

var writeDataToPdf = function(resource, filename){
    console.log('writing file to pdf...')
    return new Promise(function (resolve, reject) {
    doc.text(resource)
    doc.pipe(fs.createWriteStream(filename))
    doc.end();
    resolve();
    });
}

var readFile= function(filename){
    console.log('Reading File...')
    return new Promise(function (resolve,reject) {

     fs.readFile(filename, function (err, data) {
        if (err) {
            reject("Error readFile(): "+err);
        }else {
            resolve(data.toString());
        }
     });

    });
}

var addCard = function (x,y,w,h) {
   var headLeft ={
       x: x+10,
       y: y+10
   }
   var headRight ={
       x: x+w-100,
       y: y+10
   }
   var image={
       x: x+20,
       y: y+50,
       height: 120,
       width: 90
   }
   var body={
       x: image.x+image.width+20,
       y: y+50
   }
   var headRect={
       x: x,
       y: y,
       width: w,
       height: 30
   }
   var bodyRect={
       x: x,
       y: y+ headRect.height,
       width: w,
       height: h-30
   }



    doc.rect(headRect.x,headRect.y,headRect.width, headRect.height)
        .fillAndStroke('#6fccc9','gray')

   //x,y,wt,ht
    doc.rect(bodyRect.x, bodyRect.y, bodyRect.width, bodyRect.height)
        .fillAndStroke('#ffffff','gray')


    doc.fillColor("#ffffff").text("Hello",headLeft.x, headLeft.y)
    doc.fillColor("#ffffff").text("2mins",headRight.x,headRight.y)

    doc.image('../extras/download.jpg',image.x,image.y ,{height:image.height,width:image.width});
    var str="ahsdha adfhjsdf asf df sdfja f adfsd fnd f fafja f dfksdf jsdhfaf dfnsdjf ief ndf,dfh fef df sf e";
    doc.fillColor('#000000').text(str,body.x,body.y)

}

var initiate = function () {

    console.log(current_x+" "+current_y)
    var margin =20;
    var card_height= 200;
    for(var i=1;i<10;i++)
    {
        addCard(current_x, current_y, 500, card_height);
        current_y += (card_height+margin);
        if(current_y>660) {
            doc.addPage()
            current_y=initial
        }
    }
    doc.pipe(fs.createWriteStream('../extras/try.pdf'))
   
    doc.end();
}

initiate()

module.exports={
    readFile: readFile,
    writeDataToPdf : writeDataToPdf
}
