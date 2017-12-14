import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { PdfManagerService } from './../_services/pdf-manager.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sop-responsibles',
  templateUrl: './sop-responsibles.component.html',
  styleUrls: ['./sop-responsibles.component.css']
})
export class SopResponsiblesComponent implements OnInit {
  respsForm: FormGroup;
  resps: any;
  concs: any;
  data2Save: any;
  formErrors = {
    'name': '',
    'position': '',
    'telCode': '',
    'emailCode': ''
  };

  formErrorsH = {
    'name': '',
    'position': '',
    'telCode': '',
    'emailCode': ''
  };

  formErrorsH2 = {
    'nameC': '',
    'positionC': '',
    'tel_codeC': '',
    'email_codeC': ''
  };

  validationMessages = {
    'name': {},
    'position': {},
    'telCode': {},
    'emailCode': {}
  };

  constructor(private fb: FormBuilder, private router: Router,
    private pdfManager: PdfManagerService, private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');

  }

  ngOnInit() {
    this.setupValidationMessages();

    this.respsForm = this.fb.group({
      resps: this.fb.array([this.initRespsConcs(undefined)]),
      concs: this.fb.array([this.initRespsConcs('concs')]),
    });

    this.respsForm.valueChanges.subscribe(data => this.onValueChanged(data));

  }

  initRespsConcs(data: any) {
    // var resulInit = [{}];
    // if (data) {
    //   //CONCS
    //   if (this.pdfManager.pdfStructure.concernPersons) {
    //     console.log(this.pdfManager.pdfStructure.concernPersons);
    //     for (var i = 0; i < (this.pdfManager.pdfStructure.concernPersons).length; i++) {
    //       resulInit.push(
    //         {
    //           'name': [this.pdfManager.pdfStructure.concernPersons[i].name, Validators.required],
    //           'position': [this.pdfManager.pdfStructure.concernPersons[i].position, Validators.required],
    //           'tel_code': [this.pdfManager.pdfStructure.concernPersons[i].tel_code],
    //           'email_code': [this.pdfManager.pdfStructure.concernPersons[i].email_code]
    //         }
    //       );
    //     }
    //     return this.fb.group(resulInit);
    //   }
    // } else {
    //   //RESPS
    //   if (this.pdfManager.pdfStructure.responsibles) {
    //     for (var i = 0; i < (this.pdfManager.pdfStructure.responsibles).length; i++) {
    //       resulInit.push(
    //         {
    //           'name': [this.pdfManager.pdfStructure.responsibles[i].name, Validators.required],
    //           'position': [this.pdfManager.pdfStructure.responsibles[i].position, Validators.required],
    //           'tel_code': [this.pdfManager.pdfStructure.responsibles[i].tel_code],
    //           'email_code': [this.pdfManager.pdfStructure.responsibles[i].email_code]
    //         }
    //       );
    //     }
    //     return this.fb.group(resulInit);
    //   }
    return this.fb.group({
      'name': [null, Validators.required],
      'position': [null, Validators.required],
      'telCode': [''],
      'emailCode': ['']
    });
    // }


  }

  onValueChanged(data?: any) {
    if (!this.respsForm) { return; }
    this.data2Save = data;
    for (const field in this.formErrorsH) {
      if (this.formErrors.hasOwnProperty(field)) {
        for (var i = 0; i < ((<FormArray>this.respsForm.get('resps')).controls).length; i++) {
          this.formErrors[field + i] = '';
          var control = (<FormGroup>((<FormArray>this.respsForm.get('resps')).controls)[i]).controls[field];
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const chiave in control.errors) {
              if (control.errors.hasOwnProperty(chiave)) {
                this.formErrors[field + i] += messages[chiave] + ' ';
              }
            }
          }
        }
      }
    }


    for (const field in this.formErrorsH) {
      if (this.formErrors.hasOwnProperty(field)) {
        for (var i = 0; i < ((<FormArray>this.respsForm.get('concs')).controls).length; i++) {
          this.formErrors[field + 'C' + i] = '';
          var control = (<FormGroup>((<FormArray>this.respsForm.get('concs')).controls)[i]).controls[field];
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const chiave in control.errors) {
              if (control.errors.hasOwnProperty(chiave)) {
                this.formErrors[field + 'C' + i] += messages[chiave] + ' ';
              }
            }
          }
        }
      }
    }
  }

  newRespsConcs() {
    return this.fb.group({
      'name': [null, Validators.required],
      'position': [null, Validators.required],
      'telCode': [''],
      'emailCode': ['']
    });
  }

  setupValidationMessages() {
    this.translate.get('VALIDATION_MESSAGES').subscribe((mes: string) => {
      this.validationMessages.name['required'] = mes['NAME']['REQUIRED'];
      this.validationMessages.position['required'] = mes['POSITION']['REQUIRED'];
    });
  }

  onBackSteps() {
    this.router.navigate(['/sop-steps']);
  }

  onAddResp() {
    const control = <FormArray>this.respsForm.controls['resps'];
    control.push(this.newRespsConcs());
  }

  onRemoveResp(index) {
    const control = <FormArray>this.respsForm.controls['resps'];
    control.removeAt(index);
  }

  onAddConc() {
    const control = <FormArray>this.respsForm.controls['concs'];
    control.push(this.newRespsConcs());
  }

  onRemoveConc(index) {
    const control = <FormArray>this.respsForm.controls['concs'];
    control.removeAt(index);
  }

  onNextFooter() {
    if (this.respsForm.valid) {
      this.pdfManager.pdfStructure.responsibles = this.data2Save.resps;
      this.pdfManager.pdfStructure.concernPersons = this.data2Save.concs;
      this.router.navigate(['/sop-footer']);
    }
  }
}


