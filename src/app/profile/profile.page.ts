import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  userProfile: any;

  constructor(
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.user = this.authService.getCurrentUser();

    if (this.user) {
      console.log('user', this.user);
      this.getUserInfo();
    }
  }

  getUserInfo() {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      setTimeout(() => {
        this.userProfile = this.authService.getUserProfile().subscribe(async (data) => {
          this.userProfile = data;
        });
      }, 1000);
    }
  }

  logout() {
    this.authService.logout();
  }
}
