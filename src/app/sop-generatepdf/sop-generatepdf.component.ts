import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfManagerService } from './../_services/pdf-manager.service';
import { Location } from '@angular/common';
import { LoaderService } from '../_services/loader.service';

@Component({
  selector: 'app-sop-generatepdf',
  templateUrl: './sop-generatepdf.component.html',
  styleUrls: ['./sop-generatepdf.component.css']
})
export class SopGeneratepdfComponent implements OnInit {

  constructor(private pdfManager: PdfManagerService,
              private router: Router,
              private location: Location,
              private myLoader: LoaderService) { }

  ngOnInit() {
  }

  onBack() {
    // this.router.navigate(['/sop-footer']);
    this.location.back();
  }

  onCreatePdf() {
    // call service Node
    console.log('pdfStructure CREATED: ', this.pdfManager.pdfStructure);
    this.myLoader.start();

    this.pdfManager.createPdf().subscribe(pdfCreateResponse => {
      console.log('response created pdf: ', pdfCreateResponse);
      window.open(environment.BASE_URL + pdfCreateResponse.path, '_blank');
      this.myLoader.stop();
    });
  }
}
