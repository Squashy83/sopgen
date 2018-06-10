import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../_interfaces/user';
import { UserResponse } from '../models/user-response';


@Injectable()
export class LoginService {
  islogged: boolean
  loggedInUser: User

  constructor(private http: HttpClient) {
    this.islogged = false;
  }

  login(userid, password): Observable<UserResponse> {
    // var result;
    return this.http.get<UserResponse>('/sopgen/user/' + userid + '/' + password).map(data => {
      if (data) {
        this.loggedInUser = data.user;
        this.islogged = true;
      }
      return data;
    });

    // .subscribe(data => {
    //   this.loggedInUser = data;
    //   result = data;
    // });

    // if (result) {
    //   this.islogged = true;
    // }
    // return result;
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
