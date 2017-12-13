import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PdfManagerService } from '../_services/pdf-manager.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-sop-steps',
  templateUrl: './sop-steps.component.html',
  styleUrls: ['./sop-steps.component.css']
})
export class SopStepsComponent implements OnInit {
  stepsForm: FormGroup;
  data2Save: any;
  steps: any;
  formErrors = {
    'title': '',
    'description': ''
  };

  formErrorsH = {
    'title': '',
    'description': ''
  };



  validationMessages = {
    'title': {},
    'description': {}
  };

  constructor(private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private pdfManager: PdfManagerService,
    private location: Location) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {

    this.steps = [{ 'number': '', 'title': '', 'description': '', 'baloon': '' }];
    this.setupValidationMessages();
    this.stepsForm = this.fb.group({
      steps: this.fb.array([this.initSteps()])
    });



    this.stepsForm.valueChanges.subscribe(data => this.onValueChanged(data));

  }


  initSteps() {
    return this.fb.group({
      'title': ['', [Validators.required]],
      'description': ['', [Validators.required, Validators.minLength(20)]],
      'validate': ''
    });
  }

  onValueChanged(data?: any) {
    if (!this.stepsForm) { return; }
    this.data2Save = data;
    for (const field in this.formErrorsH) {
      if (this.formErrors.hasOwnProperty(field)) {
        for (var i = 0; i < ((<FormArray>this.stepsForm.get('steps')).controls).length; i++) {
          this.formErrors[field + i] = '';
          var control = (<FormGroup>((<FormArray>this.stepsForm.get('steps')).controls)[i]).controls[field];
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
  }

  setupValidationMessages() {
    this.translate.get('VALIDATION_MESSAGES').subscribe((mes: string) => {
      this.validationMessages.title['required'] = mes['TITLE']['REQUIRED'];
      this.validationMessages.description['required'] = mes['DESCRIPTION']['REQUIRED'];
      this.validationMessages.description['minlength'] = mes['DESCRIPTION']['MIN_LENGTH'];
    });
  }


  onBackInfo() {
    this.router.navigate(['/sop-info']);
  }

  onAddStep() {
    const control = <FormArray>this.stepsForm.controls['steps'];
    control.push(this.initSteps());

  }

  onRemoveStep(index) {
    const control = <FormArray>this.stepsForm.controls['steps'];
    control.removeAt(index);

  }

  onNextResponsibles() {
    if (this.stepsForm.valid) {
      this.pdfManager.pdfStructure.steps = this.data2Save.steps;
      this.router.navigate(['/sop-responsibles']);

    }
  }
}
