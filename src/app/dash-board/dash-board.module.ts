import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardRoutingModule } from './dash-board-routing.module';
import { AdminDashHomeComponent } from './admin-dash-home/admin-dash-home.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MapComponent } from './map/map.component';
import { NotifiComponent } from './notifi/notifi.component';
import { EventsComponent } from './events/events.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { MatTableModule } from '@angular/material/table';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ReportsComponent } from './report/report.component';

@NgModule({
  declarations: [
    AdminDashHomeComponent,
    UserProfileComponent,
    MapComponent,
    NotifiComponent,
    EventsComponent,
ManageUsersComponent,
ReportsComponent,
    FeedbacksComponent,
    FeedbacksComponent,
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    SharedModule,
    MatTableModule
 


  ],
  exports:[
    AdminDashHomeComponent,
    SharedModule,
    MatTableModule
  ]

  
  
})
export class DashBoardModule {}
