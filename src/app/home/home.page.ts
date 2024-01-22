import { Component } from '@angular/core';
import {
  ModalController,
  AlertController,
  NavController,
  LoadingController,
} from '@ionic/angular';
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
  public searchTerm: string = '';
  public partySelected: any;
  public isAPartySelected: boolean = false;
  public parties: any[] = [
    {
      id: 1,
      name: 'Fiesta de prueba 1',
      place: 'Lugar de prueba 1',
      date: '2020-10-10',
    },
    {
      id: 2,
      name: 'Fiesta de prueba 2',
      place: 'Lugar de prueba 2',
      date: '2020-10-11',
    },
    {
      id: 3,
      name: 'Fiesta de prueba 3',
      place: 'Lugar de prueba 3',
      date: '2020-10-12',
    },
  ];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private authService: AuthService,
    private clientService: ClientService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getUserInfo();
  }

  selectParty(party) {
    console.log('party', party);
    this.isAPartySelected = true;
    if (party.id) {
      this.partySelected = party;
      this.getClients();
    }
  }

  getUserInfo() {
    this.authService.getUserProfile().subscribe((data) => {
      this.user = data;
      if (data) {
        this.user['avatarImg'] = data['avatarImg'];
      }
      console.log('user', this.user);
      console.log('userid', this.user.id);

      //getParties();
    });
  }

  getClients() {
    this.clientService
      .getClientsByUserIdAndPartyId(this.user.id, this.partySelected.id)
      .subscribe((clients) => {
        console.log('clients', clients);
        this.clients = clients;
        this.filteredClients = clients;
      });
  }

  filterClients() {
    // Lógica para filtrar los clientes según el término de búsqueda
    if (this.searchTerm == '' || this.searchTerm == null) {
      this.filteredClients = this.clients;
      return;
    } else {
      this.filteredClients = this.clients.filter((client) =>
        this.removeAccents(client.name.toLowerCase()).includes(
          this.removeAccents(this.searchTerm.toLowerCase())
        )
      );
    }
  }

  removeAccents(str) { //Lógica para remover acentos de una cadena de texto
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  async openAddClientModal() {
    // Lógica para agregar el nuevo cliente a la lista de clientes
    const modal = await this.modalController.create({
      component: AddClientModalPage,
      componentProps: {
        party: this.partySelected,
      },
    });
    await modal.present();
  }
}
