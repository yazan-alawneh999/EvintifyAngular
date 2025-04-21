import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { SessionService } from './services/session.service';
import { NavController } from './services/NavController';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loading$ = this.loadingService.loading$; // Listen to loading state >> observe to loading subject
  constructor(
    private loadingService: LoadingService,
    private sessionManager: SessionService,
    private navController: NavController
  ) {}

  ngOnInit(): void {
    if (this.sessionManager.isLoggedIn()) {
      this.navController.navigate('/DashBoardPages/home');
    } else {
      this.navController.navigate('/SecurityPages/SignIn');
    }
  }
}
