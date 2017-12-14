import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

  private isActiveLoader = new Subject<boolean>();

  public loader$ = this.isActiveLoader.asObservable();
  private isJustStarted: boolean;

  constructor() { }

  public start() {
    if (this.isJustStarted) {
      return;
    }

    this.isActiveLoader.next(true);
    this.isJustStarted = true;
  }

  public stop() {
    if (!this.isJustStarted) {
      return;
    }

    this.isActiveLoader.next(false);
    this.isJustStarted = false;
  }

}
