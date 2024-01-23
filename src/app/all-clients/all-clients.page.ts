import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  AlertController,
  NavController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { AddClientModalPage } from '../add-client-modal/add-client-modal.page';
import { AuthService } from '../services/auth.service';
import { ClientService } from '../services/client.service';
import { PartiesService } from '../services/parties.service';

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.page.html',
  styleUrls: ['./all-clients.page.scss'],
})
export class AllClientsPage implements OnInit {
  public currentUser: any;
  public user: any;
  public clients: any[] = [];
  public filteredClients: any[] = [];
  public searchTerm: string = '';
  public partySelected: any;
  public isAPartySelected: boolean = false;
  public parties: any;
  public userProfile: any;
  public totalPersons: number = 0;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private authService: AuthService,
    private clientService: ClientService,
    private partiesService: PartiesService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create(); // Create a loading controller
    await loading.present(); // Present the loading controller

    this.getParties(loading);
  }

  getParties(loading) {
    this.partiesService.getAllParties().subscribe((parties) => {
      console.log('parties', parties);
      this.parties = parties;
      loading.dismiss(); // Dismiss the loading controller
    });
  }

  getClients() {
    this.clientService
      .getAllClientsByPartyId(this.partySelected.id)
      .subscribe((clients) => {
        console.log('clients', clients);
        this.clients = clients;
        this.calculateTotalPersons();
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

  selectParty(party) {
    console.log('party', party);
    this.isAPartySelected = true;
    if (party.id) {
      this.partySelected = party;
      this.getClients();
    }
  }

  async confirmGuests(client) {
    // Lógica para confirmar asistencia de un cliente
    console.log('client', client);
    this.clientService
      .confirmGuests(client.id, client.guests)
      .then(async () => {
        const toast = await this.toastController.create({
          message: '¡Asistencia confirmada!',
          duration: 2000,
        });
        await toast.present();
      }),
      async (error) => {
        console.log('Error al confirmar la asistencia', error);
        const toast = await this.toastController.create({
          message: 'Error al confirmar la asistencia',
          duration: 2000,
        });
        await toast.present();
      };
  }

  async openEditClientAlert(client) {
    // Lógica para editar un cliente
    console.log('client', client);

    let alert = await this.alertController.create({
      header: 'Editar cliente',
      message: client.name,
      cssClass: 'edit-client-alert',
      inputs: [
        {
          name: 'guests',
          type: 'number',
          value: '',
          placeholder: 'Número de invitados',
          label: 'Número de invitados',
        },
        {
          name: 'guests_confirmed',
          type: 'number',
          value: '',
          placeholder: 'Número de invitados confirmados',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          },
        },
        {
          text: 'Guardar',
          handler: (data) => {
            console.log('Guardar', data);
            this.clientService.editClient(client.id, data).then(
              async () => {
                const toast = await this.toastController.create({
                  message: '¡Cliente editado correctamente!',
                  duration: 2000,
                });
                await toast.present();
              },
              async (error) => {
                console.log('Error al editar el cliente', error);
                const toast = await this.toastController.create({
                  message: 'Error al editar el cliente',
                  duration: 2000,
                });
                await toast.present();
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }

  calculateTotalPersons() {

    this.totalPersons = this.clients.length;
    Number(this.totalPersons);
    
    //Sumar el número de invitados de cada cliente 
    this.clients.forEach((client) => {
      let guests = Number(client.guests);
      this.totalPersons += guests;
    });
  
  }
}
