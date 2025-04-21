import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NavController } from 'src/app/services/NavController';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  loginForm = this.formBuilder.group({
    username: '',
    password: '',
  });

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private jwtService: SessionService,
    private navcontroller: NavController,
    private loadingService: LoadingService
  ) {}

  onLogin() {
    debugger;
    this.loadingService.show();
    this.auth.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.jwtService.saveToken(response.token);
        this.jwtService.saveUserId(response.userId);

        this.loginForm.reset();
        this.navcontroller.navigate('/DashBoardPages/Reports');
      },
      error: (err) => {
        console.error('Login error:', err);

        this.loadingService.hide();
      },
      complete: () => {
        this.loadingService.hide();
      },
    });
  }
}
