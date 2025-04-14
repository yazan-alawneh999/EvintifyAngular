import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavController } from './NavController';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private navController: NavController) {}
  private readonly TOKEN_KEY = 'jwtToken';
  private jwtHelper = new JwtHelperService();

  // Store the token
  saveToken(token: string): void {
    debugger;
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Retrieve the token
  getToken(): string | null {
    debugger;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Remove the token
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    return token ? this.jwtHelper.isTokenExpired(token) : true;
  }

  logout() {
    this.removeToken();
    this.navController.navigate('/SecurityPages/SignIn');
  }
}
