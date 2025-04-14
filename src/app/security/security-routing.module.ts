import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'SignIn',
    component: SigninComponent,
  },
  {
    path: 'SignUp',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../dash-board/dash-board-routing.module').then(
        (m) => m.DashBoardRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
