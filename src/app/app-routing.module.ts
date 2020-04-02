import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AccessRightErrorComponent } from './access-right-error/access-right-error.component';


const routes: Routes = [
  { path: '', redirectTo: "/index", pathMatch: "full" },
  { path:'index', component: IndexComponent },
  { path:'accessRightError', component: AccessRightErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
