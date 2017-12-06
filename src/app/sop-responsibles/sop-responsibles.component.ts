import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sop-responsibles',
  templateUrl: './sop-responsibles.component.html',
  styleUrls: ['./sop-responsibles.component.css']
})
export class SopResponsiblesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onNextFooter() {
    this.router.navigate(['/sop-footer']);
  }
}


