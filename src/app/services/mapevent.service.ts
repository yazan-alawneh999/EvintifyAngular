import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapeventService {
  constructor(private http: HttpClient, private jwtService: SessionService) {}

  getMapEvents() {
    return this.http.get(
      'https://localhost:7065/api/Location/getallPinLocationEachEvent'
    );
  }
  getMapEventById(id: number) {
    return this.http.get(
      `https://localhost:7065/api/Location/getallPinLocationEachEvent/${id}`
    );
  }
}
