import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  post: any;                     // A property for our submitted form
  password: string = '';
  userid: string = '';
  requiredAlert: string = 'This field is required';

  formErrors = {
    'userid': '',
    'password': ''
  };

  validationMessages = {
    'userid': {},
    'password': {}
  };

  constructor(private fb: FormBuilder,
              private _loginService: LoginService,
              private router: Router,
              private translate: TranslateService) {
    this.loginForm = fb.group({
      'userid': [null, Validators.required],
      'password': [null, Validators.required],
      'validate': ''
    });
  }

  ngOnInit() {
    this.setupValidationMessages();
    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  login(user) {
    this._loginService.login(user.userid, user.password).subscribe(user => {
      this.router.navigate(['/sop-info']);

    });

  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }

    const form = this.loginForm;
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
      this.validationMessages.userid['required'] = mes['USERID']['REQUIRED'];
      this.validationMessages.password['required'] = mes['PASSWORD']['REQUIRED'];
    });
  }

  // login() {
  //   this.loading = true;
  //   this.authenticationService.login(this.model.username, this.model.password)
  //     .subscribe(
  //     data => {
  //       this.router.navigate([this.returnUrl]);
  //     },
  //     error => {
  //       this.alertService.error(error);
  //       this.loading = false;
  //     });
  // }

}


