import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { SopComponent } from './sop/sop.component';
import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { SopDetailComponent } from './sop-detail/sop-detail.component';
import { SopCreateComponent } from './sop-create/sop-create.component';
import { SopEditComponent } from './sop-edit/sop-edit.component';
import { SopPdfManagerComponent } from './sop-pdf-manager/sop-pdf-manager.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './_services/login.service';
import { LoginGuardService } from './_services/login_guard.service';
// import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router';

// @Injectable()
// class LoginGuard implements CanActivate {
//   constructor(private _loginService: LoginService) { }

//   canActivate() {
//     return this._loginService.isLoggedIn();
//   }
// }

const appRoutes: Routes = [
  {
    path: 'sops',
    component: SopComponent,
    canActivate: [LoginGuardService],
    data: { title: 'Sop List' }
  },
  // {
  //   path: 'sop-details/:id',
  //   component: SopDetailComponent,
  //   data: { title: 'Sop Details' }
  // },
  // {
  //   path: 'sop-create',
  //   component: SopCreateComponent,
  //   data: { title: 'Create Sop' }
  // },
  // {
  //   path: 'sop-edit/:id',
  //   component: SopEditComponent,
  //   data: { title: 'Edit Sop' }
  // },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Please Login' }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    SopComponent,
    UserComponent,
    SopDetailComponent,
    SopCreateComponent,
    SopEditComponent,
    SopPdfManagerComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AlertModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [LoginService, LoginGuardService],
  bootstrap: [AppComponent]
})






export class AppModule { }
