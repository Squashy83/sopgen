import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfManagerService } from './../_services/pdf-manager.service';

@Component({
  selector: 'app-sop-responsibles',
  templateUrl: './sop-responsibles.component.html',
  styleUrls: ['./sop-responsibles.component.css']
})
export class SopResponsiblesComponent implements OnInit {
  respsForm: FormGroup;
  resps: any;
  concs: any;
  formErrors = {
    'name': '',
    'position': '',
    'tel_code': '',
    'email_code': ''
  };

  validationMessages = {
    'name': {},
    'position': {},
    'tel_code': {},
    'email_code': {}
  };

  constructor(private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {

    //RESPONSIBLES
    this.resps = [{ 'name': '', 'position': '', 'tel_code': '', 'email_code': '' }];

    //CONCERNEDs
    this.concs = [{ 'name': '', 'position': '', 'tel_code': '', 'email_code': '' }];

    this.setupValidationMessages();

    this.respsForm = this.fb.group({
      'name': [null, Validators.required],
      'position': [null, Validators.required],
      'tel_code': [null, Validators.required],
      'email_code': [null, Validators.required]
    });

    this.respsForm.valueChanges.subscribe(data => this.onValueChanged(data));

  }

  onValueChanged(data?: any) {
    if (!this.respsForm) { return; }

    const form = this.respsForm;
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
    this.validationMessages.name = 'Please insert a name';
    this.validationMessages.position = 'Please insert a position';
    this.validationMessages.tel_code = 'Please insert a Tel Code';
    this.validationMessages.email_code = 'Please insert an Email Code';
  }

  onNextFooter() {
    console.log('onNextFooteeer!');
    this.router.navigate(['/sop-footer']);
  }

  onBackSteps() {
    this.router.navigate(['/sop-steps']);
  }

  onAddResp() {
    const dataToSave = this.respsForm.value;
    this.resps.push({ 'name': dataToSave.name,
                      'position': dataToSave.position,
                      'telCode': dataToSave.tel_code,
                      'emailCode': dataToSave.email_code });
  }

  onRemoveResp(index) {
    this.resps.splice(index, 1);
  }

  onAddConc() {
    this.concs.push({ 'title': '', 'description': '' });
  }

  onRemoveConc(index) {
    this.concs.splice(index, 1);
  }
}


