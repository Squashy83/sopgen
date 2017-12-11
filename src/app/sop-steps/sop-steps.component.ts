import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PdfManagerService } from '../_services/pdf-manager.service';

@Component({
  selector: 'app-sop-steps',
  templateUrl: './sop-steps.component.html',
  styleUrls: ['./sop-steps.component.css']
})
export class SopStepsComponent implements OnInit {
  stepsForm: FormGroup;
  steps: any;
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
              private pdfManager: PdfManagerService) {

  }

  ngOnInit() {
    this.steps = [{ 'title': '', 'description': '' }];
    this.setupValidationMessages();
    this.stepsForm = this.fb.group({
      'title': [null, Validators.required],
      'description': ['', [Validators.required, Validators.minLength(20)]],
      'validate': ''
    });

    this.stepsForm.valueChanges.subscribe(data => this.onValueChanged(data));

    console.log('pdf manager structure in cache: ', this.pdfManager.pdfStructure);
  }

  onValueChanged(data?: any) {
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
    this.validationMessages.title = 'Please insert a title';
    this.validationMessages.description = 'Please insert a description';

  }

  onNextResponsibles() {
    this.router.navigate(['/sop-responsibles']);
  }

  onBackInfo() {
    this.router.navigate(['/sop-info']);
  }

  onAddStep() {
    this.steps.push({ 'title': '', 'description': '' });
  }

  onRemoveStep(index) {
    this.steps.splice(index, 1);
  }
}
