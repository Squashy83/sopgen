import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sop-create',
  templateUrl: './sop-create.component.html',
  styleUrls: ['./sop-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SopCreateComponent implements OnInit {

  sop = {};

  sopForm: FormGroup;

  formErrors = {
    'code': '',
    'title': '',
    'background': '',
    'purpose': '',
    'responsability': ''
};

validationMessages = {
    'code': {},
    'title': {},
    'background': {},
    'purpose': {},
    'responsability': {}
};


  constructor(private http: HttpClient,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    //this.setupValidationMessages();
    this.buildForm();
  }

  buildForm() {
    this.sopForm = this.fb.group({
        'name': ['', [Validators.required]],
        'channel': ['', [Validators.required]],
        'group': [{ value: '', disabled: true }, [Validators.required]],
        'description': ['', [Validators.required, Validators.minLength(20)]]
    });
    this.sopForm.valueChanges.subscribe(data => this.onValueChanged(data));
}

/*setupValidationMessages() {
  this.translate.get('VALIDATION_MESSAGES').subscribe((mes: string) => {
      this.validationMessages.name['required'] = mes['NAME']['REQUIRED'];
      this.validationMessages.channel['required'] = mes['CHANNEL']['REQUIRED'];
      this.validationMessages.group['required'] = mes['GROUP']['REQUIRED'];
      this.validationMessages.description['required'] = mes['DESCRIPTION']['REQUIRED'];
      this.validationMessages.description['minlength'] = mes['DESCRIPTION']['MIN_LENGTH'];
  });
} */

  onValueChanged(data?: any) {
    if (!this.sopForm) { return; }

    const form = this.sopForm;
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

  saveSop() {
    this.http.post('/sop', this.sop)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/sop-details', id]);
      }, (err) => {
        console.log(err);
      }
      );
  }

  onClickCreatePdf() {
      console.log('create pdf');
  }

  onSubmit() {
  }
}