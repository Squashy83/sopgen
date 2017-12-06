import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../_interfaces/user';


@Injectable()
export class LoginService {
  islogged: boolean
  loggedInUser: User

  constructor(private http: HttpClient) {
    this.islogged = false;
  }

  login(userid, password): Observable<User> {
    var result;
    this.http.get<User>('/user/' + userid + '/' + password).subscribe(data => {
      this.loggedInUser = data;
      result = data;
    });

    if (result) {
      this.islogged = true;
    }
    return result;
  }

  isLoggedIn() {
    return this.islogged;
  }

  logoutUser(): void {
    this.islogged = false;
    this.loggedInUser = undefined;
  }

  getLoggedInUser(): User {
    return this.loggedInUser
  }

}
