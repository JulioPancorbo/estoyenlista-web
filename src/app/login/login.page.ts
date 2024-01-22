import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  user: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.authService.login(this.email, this.password);
    await loading.dismiss();

    if (user) {
      console.log('userAuth: ', user);
      await this.getRole();
    } else {
      this.showAlert(
        'Error al iniciar sesión',
        'Por favor, comprueba que tu correo electrónico y contraseña sean correctos.'
      );
    }
  }

  async getRole() {
    this.authService.getUserProfile().subscribe((data) => {
      this.user = data;
      console.log('userProfile: ', this.user);
      console.log('userid: ', this.user.id);

      if (this.user.role === 'adminrrpp') {
        this.router.navigateByUrl('/home-admin');
      } else {
        this.router.navigateByUrl('/home');
      }
    });
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
