import { Component } from '@angular/core';
import { ModalController, AlertController, NavController, LoadingController } from '@ionic/angular';
import { AddClientModalPage } from '../add-client-modal/add-client-modal.page';
import { AuthService } from '../services/auth.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public currentUser: any;
  public user: any;
  public clients: any[] = [];
  public filteredClients: any[] = [];
  public searchTerm: string = "";

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private authService: AuthService,
    private clientService: ClientService
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
          this.getClients();
        } else if (this.user.role === 'adminrrpp') {
          //
        }
      }

    });
  }


  getClients() { // Lógica para obtener los clientes del usuario
    this.clientService.getClientsByUserId(this.user.id).subscribe((clients) => {
      console.log('clients', clients);
      this.clients = clients;
      this.filteredClients = clients;
    });
  }

  getAllClientsWithRRPPs() { // Lógica para obtener todos los clientes con sus RRPPs
    console.log('getAllClientsWithRRPPs');
  }

  filterClients() { // Lógica para filtrar los clientes según el término de búsqueda    
    if (this.searchTerm == "" || this.searchTerm == null) {
      this.filteredClients = this.clients;
      return;
    } else {
      this.filteredClients = this.clients.filter(client =>
        client.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  async openAddClientModal() { // Lógica para agregar el nuevo cliente a la lista de clientes
    const modal = await this.modalController.create({
      component: AddClientModalPage,
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.clients.push(data);
      this.filteredClients = this.clients;
    }
  }

  goToProfile() {
    this.navCtrl.navigateForward('/profile');
  }

}