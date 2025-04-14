import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { NavController } from 'src/app/services/NavController';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userId!: number;
  usrProfile: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private loadingServiceUi: LoadingService
  ) {
    debugger;
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.loadingServiceUi.show();

    this.http
      .get(
        `https://localhost:7065/api/event-manager/profile-details/${this.userId}`
      )
      .subscribe({
        next: (data: any) => {
          this.usrProfile = data;
          this.cdr.detectChanges();
          this.loadingServiceUi.hide();
          console.log(data);
        },
        error: () => {
          this.loadingServiceUi.hide();
        },
        complete: () => {
          this.loadingServiceUi.hide();
        },
      });
  }
}
