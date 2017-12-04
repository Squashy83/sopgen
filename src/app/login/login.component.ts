import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.rForm = fb.group({
      'userid': [null, Validators.required],
      'password': [null, Validators.required],
      'validate': ''
    });
  }

  ngOnInit() {
  }

  addPost(post) {
    this.password = post.password;
    this.userid = post.userid;
  }

}
