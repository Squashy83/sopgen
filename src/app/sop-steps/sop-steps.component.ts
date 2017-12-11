import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PdfManagerService } from '../_services/pdf-manager.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-sop-steps',
  templateUrl: './sop-steps.component.html',
  styleUrls: ['./sop-steps.component.css']
})
export class SopStepsComponent implements OnInit {
  stepsForm: FormGroup;
  steps: any;
  countStep = 1;
  formErrors = {
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
    private pdfManager: PdfManagerService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit() {
    this.steps = [{ 'title': '', 'description': '' }];
    this.setupValidationMessages();
    this.stepsForm = this.fb.group({
      'title': ['', [Validators.required]],
      'description': ['', [Validators.required, Validators.minLength(20)]],
      'validate': ''
    });

    this.stepsForm.valueChanges.subscribe(data => this.onValueChanged(data));

    console.log('pdf manager structure in cache: ', this.pdfManager.pdfStructure);
  }

  onValueChanged(data?: any) {
    // console.log('ECCCO I DATI IN INPUT: ' + JSON.stringify(data));
    if (!this.stepsForm) { return; }

    const form = this.stepsForm;
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

  setupValidationMessages() {
    this.translate.get('VALIDATION_MESSAGES').subscribe((mes: string) => {
      this.validationMessages.title['required'] = mes['TITLE']['REQUIRED'];
      this.validationMessages.description['required'] = mes['DESCRIPTION']['REQUIRED'];
      this.validationMessages.description['minlength'] = mes['DESCRIPTION']['MIN_LENGTH'];
    });
  }

  onCheckForm(): string {
    let fieldMessageErrors = null;
    if (!this.stepsForm) { return; }

    const form = this.stepsForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && !control.valid) {
          const messages = this.validationMessages[field];
          for (const chiave in control.errors) {
            if (control.errors.hasOwnProperty(chiave)) {
              this.formErrors[field] += messages[chiave] + ' ';
            }
          }
          // ASSIGN FIRST ERROR
          if (!fieldMessageErrors) {
            fieldMessageErrors = this.formErrors[field];
          }
        }
      }
    }
    return fieldMessageErrors;
  }

  saveAllSteps() {

    if (this.stepsForm.valid) {

      const dataToSave = this.stepsForm.value;

      this.pdfManager.pdfStructure.steps = this.steps;

      this.router.navigate(['/sop-responsibles']);

    } else {
      this.onCheckForm();
    }
  }

  onBackInfo() {
    this.router.navigate(['/sop-info']);
  }

  onAddStep() {

    console.log('step forms: ', this.stepsForm.value);

    const dataToSave = this.stepsForm.value;
    /*this.steps.push({'number': this.countStep,
                      'title': dataToSave.title,
                      'description': dataToSave.description,
                      'baloon': 'Hello baloon' }); */
    this.countStep++;

    this.steps.push({'number': '', 'title': '', 'description': '', 'baloon': '' });
  }

  onRemoveStep(index) {
    this.steps.splice(index, 1);
    this.countStep--;
  }

  onNextResponsibles() {
    this.saveAllSteps();
  }
}
