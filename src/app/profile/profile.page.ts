import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail: string = '';
  user: any;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.authService.getUserProfile().subscribe(data => {
      this.user = data;
      if (data) {
        this.user['avatarImg'] = data['avatarImg'];
      }
      console.log('user', this.user);
      console.log('userid', this.user.id);

      if (this.user.id) {
        if (this.user.role === 'rrpp') {
          // 
        } else if (this.user.role === 'adminrrpp') {
          //
        }
      }

    });
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }

}
