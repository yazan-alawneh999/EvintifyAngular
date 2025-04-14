import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from './user';
import { NavController } from 'src/app/services/NavController';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  constructor(
    private userService: UserService,
    private controller: NavController
  ) {}
  users: User[] = [];
  ngOnInit(): void {
    this.getRegisteredUsers();
  }

  getRegisteredUsers() {
    debugger;

    this.userService.getRegisteredUsers().subscribe({
      next: (response) => {
        this.users = response;
        console.log(response); // Ensure proper console log
      },
    });
  }

  viewProfile(userId: number) {
    this.controller.navigateWithId('/profile', userId);
  }
}
