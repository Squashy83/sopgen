import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../_services/login.service';
import { UserComponent } from '../user/user.component';

@Component({
    selector: 'logout',
    template: `Logged In: {{loggedInUser.name}} | {{loggedInUser.username}} | 
              <button input='input' (click)="logout()">Logout</button>
      `
})
export class LogoutComponent {
    invalidCredentialMsg: string;
    loggedInUser: any;
    constructor(private loginService: LoginService, private router: Router) {
    }
    ngOnInit() {
        this.loggedInUser = this.loginService.getLoggedInUser();
    }
    logout() {
        this.loginService.logoutUser();
        this.router.navigate(['/login']);
    }
}