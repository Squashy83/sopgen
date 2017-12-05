import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {
  islogged: boolean

  constructor(private http: HttpClient) {
    this.islogged = false;
  }

  login(userid, password): Observable<any> {
    var result = this.http.get('/user/' + userid + '/' + password);
    if (result)
      this.islogged = true;
    return result;
  }

  isLoggedIn() {
    return this.islogged;
  }

}
