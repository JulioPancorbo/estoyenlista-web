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
import { PartiesService } from '../services/parties.service';

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
  public parties: any;
  public userProfile: any;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private authService: AuthService,
    private clientService: ClientService,
    private partiesService: PartiesService
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create(); // Create a loading controller
    await loading.present(); // Present the loading controller

    this.user = this.authService.getCurrentUser();

    if (this.user) {
      console.log('user', this.user);
      this.getUserInfo(loading);
    }
  }

  selectParty(party) {
    console.log('party', party);
    this.isAPartySelected = true;
    if (party.id) {
      this.partySelected = party;
      this.getClients();
    }
  }

  getUserInfo(loading) {
    this.user = this.authService.getCurrentUser();
    console.log('userioioio', this.user);
    if (this.user) {
      setTimeout(() => {
        this.userProfile = this.authService.getUserProfile().subscribe(async (data) => {
          this.userProfile = data;
          await loading.dismiss(); // Dismiss the loading controller
        });
        this.getParties();
      }, 1000);
    }
  }

  getParties() {
    this.partiesService.getAllParties().subscribe((parties) => {
      console.log('parties', parties);
      this.parties = parties;
    });
  }

  getClients() {    
    this.clientService
      .getClientsByUserIdAndPartyId(this.userProfile.id, this.partySelected.id)
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

  removeAccents(str) {
    //Lógica para remover acentos de una cadena de texto
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
