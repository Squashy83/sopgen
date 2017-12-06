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
  rForm: FormGroup;
  post: any;                     // A property for our submitted form
  password: string = '';
  userid: string = '';
  requiredAlert: string = 'This field is required';

  constructor(private fb: FormBuilder, private _loginService: LoginService, private router: Router) {
    this.rForm = fb.group({
      'userid': [null, Validators.required],
      'password': [null, Validators.required],
      'validate': ''
    });
  }

  ngOnInit() {
  }

  login(user) {
    this._loginService.login(user.userid, user.password).subscribe(user => {
      this.router.navigate(['/sop-info']);

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


