import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AttendanceReportsService } from 'src/app/services/attendancereports.service';

@Component({
  selector: 'app-admin-dash-home',
  templateUrl:'./admin-dash-home.component.html',
  styleUrls: ['./admin-dash-home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]
    )
    ])
  ]
})





export class AdminDashHomeComponent {
  
  }


  

