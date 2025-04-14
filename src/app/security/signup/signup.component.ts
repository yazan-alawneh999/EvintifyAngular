import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private router: Router, private http: HttpClient) {}

  registerForm: FormGroup = new FormGroup({
    UserName: new FormControl('Name', [Validators.required]),
    password: new FormControl('********', [Validators.minLength(8)]),
  });

  submitData() {
    debugger;

    const body: any = {};
    body.username = this.registerForm.get('UserName')?.value;
    body.password = this.registerForm.get('password')?.value;
    body.roleID = 1;

    console.log(body);

    this.http
      .post('https://localhost:7065/api/event-manager/auth/register', body)
      .subscribe(
        (resp) => {
          alert('Registration successful!');
        },
        (err) => {
          console.error('Error response:', err);
          alert('Error during registration. Please try again.');
        }
      );
  }

  goToLogin() {
    this.router.navigate(['security/Signin']);
  }
}
