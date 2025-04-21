import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashHomeComponent } from './dash-board/admin-dash-home/admin-dash-home.component';
import { DashBoardModule } from './dash-board/dash-board.module';
import { SecurityModule } from './security/security.module';

const routes: Routes = [
  { path: '', redirectTo: 'SecurityPages/SignIn', pathMatch: 'full' },

  {
    path: 'DashBoardPages',
    loadChildren: () => DashBoardModule,
  },
  {
    path: 'SecurityPages',
    loadChildren: () => SecurityModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
