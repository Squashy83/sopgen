import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sop-create',
  templateUrl: './sop-create.component.html',
  styleUrls: ['./sop-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SopCreateComponent implements OnInit {

  sop = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
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

}