import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private session: SessionService, private http: HttpClient) {}

  getRegisteredUsers(): Observable<any> {
    debugger;
    return this.http.get(
      'https://localhost:7065/api/event-manager/admin-dashboard/AllRegisteredUsers'
    );
  }

  deleteUser(userId:number): Observable<any> {
    debugger;
    return this.http.delete(
      `https://localhost:7065/api/event-manager/auth/delete/${userId}`
    );
  }


}
