import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UsertableComponent } from './usertable/usertable.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'table',
    component: UsertableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
