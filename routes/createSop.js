var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');

var pdf = require('html-pdf');
var Sop = require('../models/Sop');

router.post('/', function(req, res, next) {

    const data = JSON.parse(req.rawBody);
    
    let steps = data.steps;

    //console.log('data createSop: ', steps[0]['title']);

    Sop.create(req.body, function(err, resCreate){

      if(err) return res.status(500).json({success: false, message:'error creation sop: ', err});
      
      //read SOAP and generate HTML

      var titleHtml = '<h1>' + data.title + '</h1>';

      /*var dynamicBody = titleHtml + '<table><tr>' + '<td><div class=\"hero\"><p>STEP 1, test test test test, test, tes, test, test, <p></div></td>' + '<td><p class=\"descriptionStep\">free text related to STEP 1, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test,test,test,test,test, test, test</p></td></tr>'
      + '<tr>' + '<td><div class=\"hero\"><p>STEP 2, test test test test, test, tes, test, test, <p></div></td>' + '<td><p class=\"descriptionStep\">free text related to STEP 2</p></td></tr>' + 
      + '<tr>' + '<td><div class=\"hero\"><p>STEP 3, test test test test, test, tes, test, test, <p></div></td>' + '<td><p class=\"descriptionStep\">free text related to STEP 3</p></td></tr>' + 
      +'</table></body></html>'; */

      var dynamicBody = titleHtml + '<table>';

      console.log('data steeeeps: ', steps);

      for(let step in steps){
        let row = '<tr><td><div class=\"hero\"><p>'+ step['title'] +'<p></div></td>' + '<td><p class=\"descriptionStep\">' + step.description +'</p></td></tr>';
        dynamicBody = dynamicBody + row;
      }

      dynamicBody = dynamicBody + '</table></body></html>';

      console.log('bodyyyy: ', dynamicBody);

      fs.appendFileSync(path.join(__dirname, '../assets/skeleton-pdf.html'), dynamicBody);


      //create PDF
      fs.readFile(path.join(__dirname, '../assets/skeleton-pdf.html'), 'utf8', function (err,data) {
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

            res.json({success: true, message:'S.O.P correctly created!'});
            });
      });
    })
});

module.exports = router;
