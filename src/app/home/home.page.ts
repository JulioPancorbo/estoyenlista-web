import { Component } from '@angular/core';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { AddClientModalPage } from '../add-client-modal/add-client-modal.page'; // Asegúrate de tener este archivo creado
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public user: any;
  public clients: any[] = [];
  public filteredClients: any[] = [];
  public searchTerm: string = "";

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private navCtrl: NavController,
    private authService: AuthService
  ) {
    this.authService.getUserProfile().subscribe((userProfile) => { //get user profile
      console.log('userProfile', userProfile);
      this.user = userProfile;
    });
  }

  ngOnInit() {
    // this.getUser();
    // this.getUserInfo();

    // Lógica para cargar los clientes del usuario al inicializar la página
    this.filteredClients = this.clients;
  }



  // getUserInfo() {
  //   this.authService.getUserProfile().subscribe(data => {
  //     this.user = data;
  //     if (data) {
  //       this.user['avatarImg'] = data['avatarImg'];
  //     }
  //     console.log('user', this.user);
  //     console.log('userid', this.user.id);

  //     if (this.user.id) {
  //       if (this.user.role === 'rrpp') {
  //         // 
  //       } else if (this.user.role === 'adminrrpp') {
  //         //
  //       }
  //     }

  //   });
  // }

  filterClients() {
    console.log("filterClients");
    // Lógica para filtrar los clientes según el término de búsqueda
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async openAddClientModal() {
    console.log("openAddClientModal");

    const modal = await this.modalController.create({
      component: AddClientModalPage,
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      // Lógica para agregar el nuevo cliente a la lista de clientes
      this.clients.push(data);
      this.filteredClients = this.clients;
    }

  }

  goToProfile() {
    this.navCtrl.navigateForward('/profile');
  }



}
