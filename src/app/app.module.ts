import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SopComponent } from './sop/sop.component';
import { UserComponent } from './user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { SopDetailComponent } from './sop-detail/sop-detail.component';
import { SopCreateComponent } from './sop-create/sop-create.component';
import { SopEditComponent } from './sop-edit/sop-edit.component';
import { SopPdfManagerComponent } from './sop-pdf-manager/sop-pdf-manager.component';

const appRoutes: Routes = [
  {
    path: 'sops',
    component: SopComponent,
    data: { title: 'Sop List' }
  },
  {
    path: 'sop-details/:id',
    component: SopDetailComponent,
    data: { title: 'Sop Details' }
  },
  {
    path: 'sop-create',
    component: SopCreateComponent,
    data: { title: 'Create Sop' }
  },
  {
    path: 'sop-edit/:id',
    component: SopEditComponent,
    data: { title: 'Edit Sop' }
  },
  {
    path: '',
    redirectTo: '/sops',
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
    SopPdfManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
