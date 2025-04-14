import { ChangeDetectorRef,Component,OnInit } from '@angular/core';
import autoTable from 'jspdf-autotable';
import { AttendanceReportsService } from 'src/app/services/attendancereports.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { User } from '../manage-users/user';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { NavController } from 'src/app/services/NavController';
import { UserService } from 'src/app/services/user.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css'],
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
export class FeedbacksComponent implements OnInit {

    constructor(
    private userService: UserService,
    private controller: NavController,
    private AttendanceServices:AttendanceReportsService
  ) {}



  users: User[] = [];
  
  ngOnInit(): void {
    this.getRegisteredUsers();
    this.showAttendanceReport();
  }

  getRegisteredUsers() {
    this.userService.getRegisteredUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
    });
  }

  viewProfile(userId: number) {
    this.controller.navigateWithId('/profile', userId);
  }


  showAttendanceReport() {
    this.AttendanceServices.showAttendanceReport().subscribe({
      next: (response) => {
        this.AttendanceServices.Report = response;
        this.EventReport = response;
      },
      error: (error) => {
        console.error('Error fetching attendance report:', error);
      },
    });
  }
  selectedRow: any = null;

  EventReport :any;

  displayedColumns: string[] = ['Name_Event','checkIn_rates', 'feedback'];


  selectRow(row: any) {
    this.selectedRow = row;
  }

toggleFeedback(row: any) {
  row.showFeedback = !row.showFeedback;
  this.selectedRow = row.showFeedback ? row : null;
}


getStars(rate: number): string {
  const fullStars = Math.round(rate);
  return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
}



printEventReport() {
  window.print();
}


}
