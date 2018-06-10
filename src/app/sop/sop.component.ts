import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sop',
  templateUrl: './sop.component.html',
  styleUrls: ['./sop.component.css']
})
export class SopComponent implements OnInit {
  sops: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/sopgen/sop').subscribe(data => {
      this.sops = data;
    });
  }

}
