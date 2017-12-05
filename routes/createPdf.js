
var fs = require('fs');
var pdf = require('html-pdf');
var path = require('path');

var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    
    fs.readFile(path.join(__dirname, '../assets/pdf-conf.html'), 'utf8', function (err,data) {
        if (err) {
          return console.log('error read file: ', err);
        }

        console.log('data read: ', data);

        var options = { format: 'A4' };

            pdf.create(data, options).toFile('./businesscard.pdf', function(err, resultPdf) {
                
            if (err){
                console.log('error creation PDF: ' + err);
                res.status(500).json({success: false, message:'error in pdf creation: ' + err});
            } 

            res.json({success: true, message:'saved feedback type ok'});
            });
      });
});

module.exports = router;
