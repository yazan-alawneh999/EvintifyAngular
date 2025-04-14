import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceReportsService {

  Report :any =[];

  constructor(private http: HttpClient, private session: SessionService) { }

  showAttendanceReport()
  { 
    return this.http.get('https://localhost:7065/api/Event/GetAllFeedbackInEachEvent')
  }

}
