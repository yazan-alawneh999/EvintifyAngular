import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashHomeComponent } from './admin-dash-home/admin-dash-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MapComponent } from './map/map.component';
import { NotifiComponent } from './notifi/notifi.component';
import { EventsComponent } from './events/events.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { ReportsComponent } from './report/report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: AdminDashHomeComponent,
  },
  {
    path: 'UserProfile',
    component: UserProfileComponent,
  },
  {
    path: 'Map',
    component: MapComponent,
  },
  {
    path: 'Notifi',
    component: NotifiComponent,
  },
  {
    path: 'Events',
    component: EventsComponent,
  },
  {
    path: 'Users',
    component: ManageUsersComponent,
  },
  {
    path: 'Reports',
    component: ReportsComponent,
  },
  {
    path: 'Feedback',
    component: FeedbacksComponent,
  },
  { path: 'profile/:id', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashBoardRoutingModule {}
