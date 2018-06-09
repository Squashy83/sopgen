var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');

var pdf = require('html-pdf');
var Sop = require('../models/Sop');

const uuidv4 = require('uuid/v4');

router.post('/sopgen', function (req, res, next) {

  const data = JSON.parse(req.rawBody);

  let steps = data.steps;
  let responsibles = data.responsibles;
  let concernPersons = data.concernPersons;
  let footer = data.footer;

  Sop.create(req.body, function (err, resCreate) {

    if (err) return res.status(500).json({
      success: false,
      message: 'error creation SOP: ',
      err
    });

    //read SOAP and generate HTML
    var dynamicBody = '<table>';

    for (let i = 0; i < steps.length; i++) {
      let row = '<tr><td class=\"tdBallon\"><div class=\"hero\">' + steps[i].title + '</div></td>' + '<td><p class=\"descriptionStep\">' + steps[i].description + '</p></td></tr>';
      dynamicBody = dynamicBody + row;
    }

    dynamicBody = dynamicBody + '</table>';

    var dinamicResponsible = '';
    for (let j = 0; j < responsibles.length; j++) {
      let row = '<tr><td><p class="generalInfo">' + responsibles[j].name + '</p></td>' + '<td><p class="generalInfo">' + responsibles[j].position + '</p></td>' + '<td><p class="generalInfo">' + responsibles[j].telCode + '</p></td>' + '<td><p class="generalInfo">' + responsibles[j].emailCode + '</p></td></tr>';
      dinamicResponsible = dinamicResponsible + row;
    }

    var dinamicConcernPersons = '';
    for (let z = 0; z < concernPersons.length; z++) {
      let row = '<tr><td><p class="generalInfo">' + concernPersons[z].name + '</p></td>' + '<td><p class="generalInfo">' + concernPersons[z].position + '</p></td>' + '<td><p class="generalInfo">' + concernPersons[z].telCode + '</p></td>' + '<td><p class="generalInfo">' + concernPersons[z].emailCode + '</p></td></tr>';
      dinamicConcernPersons = dinamicConcernPersons + row;
    }

    //READ standard CSS
    fs.readFile(path.join(__dirname, '../assets/skeleton-pdf.html'), 'utf8', function (err, dataSkeleton) {
      if (err) {
        return console.log('error read file: ', err);
      }

      //create new File with CSS and replace dynamic data

      dataSkeleton = dataSkeleton.replace('SOP_FLOW', dynamicBody);

      dataSkeleton = dataSkeleton.replace('SOP_TITLE', data['title']);
      dataSkeleton = dataSkeleton.replace('SOP_CODE', data['code']);
      dataSkeleton = dataSkeleton.replace('SOP_BACKGROUND', data['background']);
      dataSkeleton = dataSkeleton.replace('SOP_PURPOSE', data['purpose']);
      dataSkeleton = dataSkeleton.replace('SOP_RESPONSIBILITY', data['responsability']);

      dataSkeleton = dataSkeleton.replace('SOP_RESPONSIBLES', dinamicResponsible);
      dataSkeleton = dataSkeleton.replace('SOP_CONCERN_PERSONS', dinamicConcernPersons);
      dataSkeleton = dataSkeleton.replace('SOP_NOTES', footer.notes);

      dataSkeleton = dataSkeleton.replace('TESTED_ON_VALUE', footer.testedon);
      dataSkeleton = dataSkeleton.replace('IMPLEMENTED_VALUE', footer.implemented);
      dataSkeleton = dataSkeleton.replace('REVIEWED_VALUE', footer.reviewed);

      dataSkeleton = dataSkeleton.replace('ACTION_VALUE', footer.action);
      dataSkeleton = dataSkeleton.replace('START_VALUE', footer.start);
      dataSkeleton = dataSkeleton.replace('EXPECTED_CLOSURE_VALUE', footer.expclo);
      dataSkeleton = dataSkeleton.replace('CLOSURE_VALUE', footer.closure);

      // console.log('dataSkeleton: ', dataSkeleton);

      var options = {
        format: 'A4'
      };

      const randomNamePdf = uuidv4() + '.pdf';

      pdf.create(dataSkeleton, options).toFile('./public/' + randomNamePdf, function (err, resultPdf) {

        if (err) {
          console.log('error creation PDF: ' + err);
          res.status(500).json({
            success: false,
            message: 'error in pdf creation: ' + err
          });
        }

        res.json({
          success: true,
          message: 'S.O.P correctly created!',
          path: 'public/' + randomNamePdf
        });
      });
    });
  })
});

module.exports = router;
