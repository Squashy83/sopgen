import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sop-steps',
  templateUrl: './sop-steps.component.html',
  styleUrls: ['./sop-steps.component.css']
})
export class SopStepsComponent implements OnInit {
  rForm: FormGroup;
  steps: any
  constructor(private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.steps = [{ 'title': 'Hi I\'m step 1', 'description': 'this is a description of a step 1!!' }, { 'title': 'Hi I\'m step 2', 'description': 'this is a description of a step 2!!' }, { 'title': 'Hi I\'m step 3', 'description': 'this is a description of a step 3!!' }];
    this.rForm = this.fb.group({
      'title': [null, Validators.required],
      'description': ['', [Validators.required, Validators.minLength(20)]],
      'validate': ''
    });
  }

  onNextResponsibles() {
    this.router.navigate(['/sop-responsibles']);
  }
}
