import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: any;

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private router: Router
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.urlAfterRedirects === '/login') {
          this.menu.enable(false);
        } else {
          this.menu.enable(true);
        }
      });
  }

  navigateTo(page: string) {
    this.navCtrl.navigateForward('/' + page);
  }
}
