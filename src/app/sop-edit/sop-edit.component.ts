import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sop-edit',
  templateUrl: './sop-edit.component.html',
  styleUrls: ['./sop-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SopEditComponent implements OnInit {

  sop = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSop(this.route.snapshot.params['id']);
  }

  getSop(id) {
    this.http.get('/sopgen/sop/' + id).subscribe(data => {
      this.sop = data;
    });
  }

  updateSop(id, data) {
    this.http.put('/sopgen/sop/' + id, data)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/sop-details', id]);
      }, (err) => {
        console.log(err);
      }
      );
  }

}