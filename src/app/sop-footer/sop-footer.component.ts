import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfManagerService } from './../_services/pdf-manager.service';

@Component({
  selector: 'app-sop-footer',
  templateUrl: './sop-footer.component.html',
  styleUrls: ['./sop-footer.component.css']
})
export class SopFooterComponent implements OnInit {

  constructor(private pdfManager: PdfManagerService) { }

  ngOnInit() {
  }

  onCreatePdf() {
    // call service Node
    console.log('pdfStructure: ', this.pdfManager.pdfStructure);
    this.pdfManager.createPdf();
  }
}
