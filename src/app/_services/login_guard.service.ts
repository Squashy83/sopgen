import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class LoginGuardService implements CanActivate/*, CanActivateChild*/ {

    constructor(private loginService: LoginService, private router: Router) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // let url: string = state.url;
        // console.log('Url:' + url);
        if (this.loginService.isLoggedIn()) {
            return true;
        }
        // this.loginService.setRedirectUrl(url);
        // this.router.navigate([this.loginService.getLoginUrl()]);
        // return false;
    }
    // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     let loggedInUser = this.loginService.getLoggedInUser();
    //     if (loggedInUser.role === 'ADMIN') {
    //         return true;
    //     } else {
    //         console.log('Unauthorized to open link: ' + state.url);
    //         return false;
    //     }
    // }
} 