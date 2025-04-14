import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtService: SessionService) {}

  login(userCredentials: any): Observable<any> {
    debugger;
    return this.http.post(
      'https://localhost:7065/api/event-manager/auth/login',
      userCredentials
    );
  }

  logout() {
    this.jwtService.removeToken();
  }
}
