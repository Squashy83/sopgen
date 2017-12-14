import { LoaderService } from './../../_services/loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {

  isActive: boolean;

  constructor(private loaderService: LoaderService) {
    this.isActive = false;
    loaderService.loader$.subscribe((isActive) => {
      this.isActive = isActive;
    });
  }

  ngOnInit() {
  }
}
