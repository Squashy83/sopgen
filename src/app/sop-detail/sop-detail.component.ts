import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sop-detail',
  templateUrl: './sop-detail.component.html',
  styleUrls: ['./sop-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SopDetailComponent implements OnInit {

  sop = {};

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getSopDetail(this.route.snapshot.params['id']);
  }

  getSopDetail(id) {
    this.http.get('/sopgen/sop/' + id).subscribe(data => {
      this.sop = data;
    });
  }

  deleteSop(id) {
    this.http.delete('/sopgen/sop/' + id)
      .subscribe(res => {
        this.router.navigate(['/sops']);
      }, (err) => {
        console.log(err);
      }
      );
  }

}