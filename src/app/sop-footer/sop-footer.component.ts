import { PdfManagerService } from './../_services/pdf-manager.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sop-footer',
  templateUrl: './sop-footer.component.html',
  styleUrls: ['./sop-footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SopFooterComponent implements OnInit {

  sop = {};

  footerForm: FormGroup;

  formErrors = {
    'action': '',
    'start': '',
    'expclo': '',
    'closure': '',
    'notes': '',
    'testedon': '',
    'implemented': '',
    'reviewed': ''
  };

  validationMessages = {
    'action': {},
    'start': {},
    'expclo': {},
    'closure': {},
    'notes': {},
    'testedon': {},
    'implemented': {},
    'reviewed': {}
  };

  constructor(private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private translate: TranslateService,
    private pdfManager: PdfManagerService,
    private location: Location) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    this.setupValidationMessages();
    if (this.pdfManager.pdfStructure.footer)
      this.buildForm(undefined);
    else this.buildForm('reload');
  }

  buildForm(reload: any) {

    if (reload) {
      this.footerForm = this.fb.group({
        'action': [''],
        'start': [''],
        'expclo': [''],
        'closure': [''],
        'notes': [''],
        'testedon': [''],
        'implemented': [''],
        'reviewed': ['']
      });
    } else {
      this.footerForm = this.fb.group({
        'action': [this.pdfManager.pdfStructure.footer.action],
        'start': [this.pdfManager.pdfStructure.footer.start],
        'expclo': [this.pdfManager.pdfStructure.footer.expclo],
        'closure': [this.pdfManager.pdfStructure.footer.closure],
        'notes': [this.pdfManager.pdfStructure.footer.notes],
        'testedon': [this.pdfManager.pdfStructure.footer.testedon],
        'implemented': [this.pdfManager.pdfStructure.footer.implemented],
        'reviewed': [this.pdfManager.pdfStructure.footer.reviewed]
      });
    }

    this.footerForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  setupValidationMessages() {
    this.translate.get('VALIDATION_MESSAGES').subscribe((mes: string) => {
      this.validationMessages.action['required'] = mes['CODE']['REQUIRED'];
      this.validationMessages.start['required'] = mes['TITLE']['REQUIRED'];
      this.validationMessages.expclo['required'] = mes['BACKGROUND']['REQUIRED'];
      this.validationMessages.closure['minlength'] = mes['PURPOSE']['MIN_LENGTH'];
      this.validationMessages.notes['required'] = mes['PURPOSE']['REQUIRED'];
      this.validationMessages.testedon['required'] = mes['RESPONSABILITY']['REQUIRED'];
      this.validationMessages.implemented['required'] = mes['RESPONSABILITY']['REQUIRED'];
      this.validationMessages.reviewed['required'] = mes['RESPONSABILITY']['REQUIRED'];
    });
  }

  onValueChanged(data?: any) {
    if (!this.footerForm) { return; }

    const form = this.footerForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const chiave in control.errors) {
            if (control.errors.hasOwnProperty(chiave)) {
              this.formErrors[field] += messages[chiave] + ' ';
            }
          }
        }
      }
    }
  }

  // onCheckForm(): string {
  //   let fieldMessageErrors = null;
  //   if (!this.footerForm) { return; }

  //   const form = this.footerForm;
  //   for (const field in this.formErrors) {
  //     if (this.formErrors.hasOwnProperty(field)) {
  //       this.formErrors[field] = '';
  //       const control = form.get(field);

  //       if (control && !control.valid) {
  //         const messages = this.validationMessages[field];
  //         for (const chiave in control.errors) {
  //           if (control.errors.hasOwnProperty(chiave)) {
  //             this.formErrors[field] += messages[chiave] + ' ';
  //           }
  //         }
  //         // ASSIGN FIRST ERROR
  //         if (!fieldMessageErrors) {
  //           fieldMessageErrors = this.formErrors[field];
  //         }
  //       }
  //     }
  //   }
  //   return fieldMessageErrors;
  // }

  saveGeneralFooter() {

    if (this.footerForm.valid) {

      const dataToSave = this.footerForm.value;

      if (this.pdfManager.pdfStructure.footer) {
        this.pdfManager.pdfStructure.footer.action = dataToSave.action;
        this.pdfManager.pdfStructure.footer.start = dataToSave.start;
        this.pdfManager.pdfStructure.footer.expclo = dataToSave.expclo;
        this.pdfManager.pdfStructure.footer.closure = dataToSave.closure;
        this.pdfManager.pdfStructure.footer.notes = dataToSave.notes;
        this.pdfManager.pdfStructure.footer.testedon = dataToSave.testedon;
        this.pdfManager.pdfStructure.footer.implemented = dataToSave.implemented;
        this.pdfManager.pdfStructure.footer.reviewed = dataToSave.reviewed;
      } else {
        const footer = {
          'action': dataToSave.action,
          'start': dataToSave.start,
          'expclo': dataToSave.expclo,
          'closure': dataToSave.closure,
          'notes': dataToSave.notes,
          'testedon': dataToSave.testedon,
          'implemented': dataToSave.implemented,
          'reviewed': dataToSave.reviewed
        };

        this.pdfManager.pdfStructure.footer = footer;
      }


      this.router.navigate(['/sop-generatepdf']);
    }

    // else {
    //   this.onCheckForm();
    // }
  }

  onBackResponsibles() {
    this.location.back();
  }

  onNextPdfCreate() {
    this.saveGeneralFooter();
  }
}