import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: any;
  role: any;

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/login') {
          this.menu.enable(false);
        } else {
          this.getUserInfo();          
        }
      });
  }

  async getUserInfo() {
    
    this.authService.getUserProfile().subscribe((data) => {
      this.user = data;      
      console.log('user', this.user);
      console.log('userid', this.user.id);
      this.role = this.user.role;
      console.log('role', this.role);
      this.menu.enable(true);
    });
  
  }

  navigateTo(page: string) {
    this.navCtrl.navigateForward('/' + page);
  }
}
