import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { PartiesService } from '../services/parties.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-rrpp-details',
  templateUrl: './rrpp-details.page.html',
  styleUrls: ['./rrpp-details.page.scss'],
})
export class RrppDetailsPage implements OnInit {
  public rrppId: string;
  public rrpp: any;
  public clients: any[] = [];
  public filteredClients: any[] = [];
  public searchTerm: string = '';
  public partyId: any;

  constructor(
    private clientService: ClientService,
    private partiesService: PartiesService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.rrppId = history.state.rrppId; // Obtenemos el id del RRPP que nos llega por parámetro
    this.partyId = history.state.partyId; // Obtenemos la fiesta seleccionada que nos llega por parámetro
    console.log('rrppId', this.rrppId);
    console.log('partyId', this.partyId);
  }

  ngOnInit() {
    this.getRRPP();
    this.getClients();
  }

  getRRPP() {
    this.partiesService.getRRPPById(this.rrppId).subscribe((rrpp) => {
      console.log('rrpp', rrpp);
      this.rrpp = rrpp;
    });
  }

  getClients() {
    this.clientService
      .getClientsByUserIdAndPartyId(this.rrppId, this.partyId)
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

  async confirmGuests(client) {
    // Lógica para confirmar asistencia de un cliente
    console.log('client', client);
    this.clientService.confirmGuests(client.id, client.guests).then(async () => {
      const toast = await this.toastController.create({
        message: '¡Asistencia confirmada!',
        duration: 2000,
      });
      await toast.present();
    }), async (error) => {
      console.log('Error al confirmar la asistencia', error);   
      const toast = await this.toastController.create({
        message: 'Error al confirmar la asistencia',
        duration: 2000,
      });
      await toast.present();
    }
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
        }
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
            this.clientService.editClient(client.id, data).then(async () => {
              const toast = await this.toastController.create({
                message: '¡Cliente editado correctamente!',
                duration: 2000,
              });
              await toast.present();
            }, async (error) => {
              console.log('Error al editar el cliente', error);              
              const toast = await this.toastController.create({
                message: 'Error al editar el cliente',
                duration: 2000,
              });
              await toast.present();
            });
          },
        },
      ],
    });    
    await alert.present();
  }
}
