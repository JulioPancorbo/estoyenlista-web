import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public email: string = "";
  public password: string = "";
  public name: string = "";
  public confirmPassword: string = "";

  constructor(
    public authService: AuthService,
    private router: Router,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) { }

  ngOnInit() { }

  isValidEmail(): boolean {
    // Utiliza una expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  isValidForm(): boolean {
    // Verifica que el correo electrónico sea válido y que la contraseña tenga al menos 6 caracteres
    return this.isValidEmail() && this.password.length >= 6;
  }

  isValidPassword(): boolean {
    // Verifica que las contraseñas coincidan
    return this.password === this.confirmPassword;
  }

  async register() {    
    
    const loading = await this.loadingCtrl.create();
    await loading.present();

    const user = await this.authService.register(this.email, this.password, this.name);
    await loading.dismiss();

    if (user) {
      // this.router.navigateByUrl('/home', { replaceUrl: true });
      this.toastController.create({
        message: 'Usuario registrado correctamente.',
        duration: 2000
      }).then(toast => toast.present());
    } else {
      this.showAlert('Error al registrarse', 'Por favor, inténtelo de nuevo.');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
