import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  user: any;
  userProfile: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.authService.login(this.email, this.password);

    if (user) {
      console.log('userAuth: ', user);
      this.user = user;
      this.getRole(loading);
    } else {
      this.showAlert(
        'Error al iniciar sesión',
        'Por favor, comprueba que tu correo electrónico y contraseña sean correctos.'
      );
      await loading.dismiss();
    }
  }

  getRole(loading) { 
    if (this.user) {
      setTimeout(() => {
        loading.dismiss();
        this.userProfile = this.authService.getUserProfile().subscribe((data) => {
          this.userProfile = data;
          console.log('userProfile', this.userProfile);
          if (this.userProfile.role === 'adminrrpp') {
            console.log('adminrrpp');
            this.navCtrl.navigateRoot('/home-admin');
          } else {
            console.log('rrpp');
            this.navCtrl.navigateRoot('/home');
          }
        });
      }, 1000);
    }
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
