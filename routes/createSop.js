var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');

var pdf = require('html-pdf');
var Sop = require('../models/Sop');

router.post('/', function(req, res, next) {

    const data = JSON.parse(req.rawBody);
    
    let steps = data.steps;
    let responsables = data.responsables;
    let notes = data.notes;

    Sop.create(req.body, function(err, resCreate){

      if(err) return res.status(500).json({success: false, message:'error creation sop: ', err});
      
      //read SOAP and generate HTML
      var dynamicBody = '<table>';

      for(let i=0;i<steps.length;i++){
        let row = '<tr><td class=\"tdBallon\"><div class=\"hero\"><p>'+ steps[i].title +'<p></div></td>' + '<td><p class=\"descriptionStep\">' + steps[i].description +'</p></td></tr>';
        dynamicBody = dynamicBody + row;
      }

      dynamicBody = dynamicBody + '</table>';

      var dinamicResponsable = '';
      for(let j=0;j<responsables.length;j++){
        let row =  '<tr><td class=\"trInfo\"><p class="generalInfo">' + responsables[j].name + '</p></td>' + '<td><p class="generalInfo">' + responsables[j].position + '</p></td>' + '<td><p class="generalInfo">' + responsables[j].telCode + '</p></td>' + '<td><p class="generalInfo">' + responsables[j].emailCode + '</p></td></tr>';
        dinamicResponsable = dinamicResponsable + row;
      }

      //READ standard CSS
      fs.readFile(path.join(__dirname, '../assets/skeleton-pdf.html'), 'utf8', function (err,dataSkeleton) {
        if (err) {
          return console.log('error read file: ', err);
        }

        //create new File with CSS and replace dynamic data
        
        dataSkeleton = dataSkeleton.replace('SOP_FLOW', dynamicBody);

        dataSkeleton = dataSkeleton.replace('SOP_TITLE', data['title']);
        dataSkeleton = dataSkeleton.replace('SOP_CODE', data['code']);
        dataSkeleton = dataSkeleton.replace('SOP_BACKGROUND', data['background']);
        dataSkeleton = dataSkeleton.replace('SOP_PURPOSE', data['purpose']);
        dataSkeleton = dataSkeleton.replace('SOP_RESPONSABILITY', data['responsability']);

        dataSkeleton = dataSkeleton.replace('SOP_RESPONSIBLES', dinamicResponsable);
        dataSkeleton = dataSkeleton.replace('SOP_NOTES', notes);

        var options = { format: 'A4' };

        console.log('html created: ', dataSkeleton);

            pdf.create(dataSkeleton, options).toFile('./sop-flow.pdf', function(err, resultPdf) {
                
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
