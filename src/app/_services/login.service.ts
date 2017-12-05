import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {


  constructor(private http: HttpClient) {

  }

  login(userid, password): Observable<any> {
    return this.http.get('/user/' + userid + '/' + password);

  }

}
