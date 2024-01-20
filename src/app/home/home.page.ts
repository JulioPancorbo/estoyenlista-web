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

  ngOnInit() {
    this.loadingController.create({
      message: 'Cargando clientes...'
    }).then((loading) => {
      loading.present();
      this.authService.getUserProfile().subscribe((userProfile) => { // Lógica para obtener el perfil del usuario
        console.log('userProfile', userProfile);
        this.user = userProfile;

        if (this.user.id && this.user.role == 'rrpp') {
          this.getClients();
        } else {
          this.getAllClientsWithRRPPs();
        }
      });
      loading.dismiss();
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