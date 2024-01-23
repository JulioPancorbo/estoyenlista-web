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
      await this.getRole(loading);
    } else {
      this.showAlert(
        'Error al iniciar sesión',
        'Por favor, comprueba que tu correo electrónico y contraseña sean correctos.'
      );
      await loading.dismiss();
    }
  }

  async getRole(loading) {
    this.user = this.authService.getCurrentUser();
    
    if (this.user) {
      setTimeout(() => {
        loading.dismiss();
        this.user = this.authService.getUserProfile().subscribe((data) => {
          this.user = data;
          console.log('user', this.user);
        });
        if (this.user.role === 'adminrrpp') {
          console.log('adminrrpp');
          this.navCtrl.navigateRoot('/home-admin');
        } else {
          console.log('rrpp');
          this.navCtrl.navigateRoot('/home');
        }
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
