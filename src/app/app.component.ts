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
  userProfile: any;
  role: string;

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('event', event);
        
        if (event.urlAfterRedirects == '/login') {
          console.log('entro aqui');          
          this.menu.enable(false);
        } else {
          console.log('entro alla');          
          this.getUserInfo(event);          
        }
      });
  }

  getUserInfo(event) {
    if(event.urlAfterRedirects == '/login') {
      console.log('entro aqui2');
      
      this.menu.enable(false);
    }else{
      console.log('entro alla2');
      this.user = this.authService.getCurrentUser();
      console.log('userioioio', this.user);
      if(this.user) {
        setTimeout(() => {
          this.userProfile = this.authService.getUserProfile().subscribe((data) => {
            this.userProfile = data;
            console.log('userProfile', this.userProfile);
            this.role = this.userProfile.role;
            this.menu.enable(true);          
          });
        }, 1000);
      }
    }  
  }

  navigateTo(page: string) {
    this.navCtrl.navigateForward('/' + page);
  }
}
