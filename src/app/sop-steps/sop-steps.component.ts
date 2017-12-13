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

  steps: any;
  // countStep = 1;
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

    if (this.pdfManager.pdfStructure.steps) {
      for (var step in this.pdfManager.pdfStructure.steps) {
        this.steps.push(step);
      }
    } else
      this.steps = [{ 'number': '', 'title': '', 'description': '', 'baloon': '' }];
    this.setupValidationMessages();
    this.stepsForm = this.fb.group({
      steps: this.fb.array([this.initSteps()])
    });



    // itemRows: this.fb.array(
    //   'title': ['', [Validators.required]],
    //   'description': ['', [Validators.required, Validators.minLength(20)]],
    //   'validate': ''
    // )


    this.stepsForm.valueChanges.subscribe(data => this.onValueChanged(data));

    //console.log('pdf manager structure in cache: ', this.pdfManager.pdfStructure);
  }


  initSteps() {
    return this.fb.group({
      'title': ['', [Validators.required]],
      'description': ['', [Validators.required, Validators.minLength(20)]],
      'validate': ''
    });
  }
  // initItemRows() {
  //   return this._fb.group({
  //     itemname: ['']
  //   });
  // }

  onValueChanged(data?: any) {
    // if (!this.stepsForm) { return; }
    if (!this.stepsForm) { return; }

    //const form = this.stepsForm;
    for (const field in this.formErrorsH) {
      if (this.formErrors.hasOwnProperty(field)) {


        console.log(<FormArray>this.stepsForm.get('steps'));
        for (var i = 0; i < ((<FormArray>this.stepsForm.get('steps')).controls).length; i++) {
          this.formErrors[field + i] = '';
          var control = (<FormGroup>((<FormArray>this.stepsForm.get('steps')).controls)[i]).controls[field];
          console.log(control);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const chiave in control.errors) {
              console.log(chiave);
              if (control.errors.hasOwnProperty(chiave)) {

                this.formErrors[field + i] += messages[chiave] + ' ';
                console.log(this.formErrors[field + i]);
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
    console.log("ECCO GLI STEP SALVATI:" + JSON.stringify(this.stepsForm.value));
    if (this.stepsForm.valid) {

      const dataToSave = this.stepsForm.value;

      this.pdfManager.pdfStructure.steps = [];


      for (var i = 0; i < (this.steps).length; i++) {
        this.pdfManager.pdfStructure.steps[i] = this.steps[i];
      }
      // for (var step in this.steps) {
      //   console.log("inserisco step: " + JSON.stringify(step));
      //   this.pdfManager.pdfStructure.steps.push(step);
      // }

      this.router.navigate(['/sop-responsibles']);

    } else {
      this.onCheckForm();
    }
  }

  onBackInfo() {
    // this.router.navigate(['/sop-info']);
    this.location.back();
  }

  onAddStep() {
    const control = <FormArray>this.stepsForm.controls['steps'];
    control.push(this.initSteps());
    // console.log('step forms: ', this.stepsForm.value);

    // const dataToSave = this.stepsForm.value;

    // this.countStep++;

    // this.steps.push({ 'number': '', 'title': '', 'description': '', 'baloon': '' });
  }

  onRemoveStep(index) {
    // this.steps.splice(index, 1);
    const control = <FormArray>this.stepsForm.controls['steps'];
    control.removeAt(index);
    // this.countStep--;
  }

  onNextResponsibles() {
    this.saveAllSteps();
  }
}
