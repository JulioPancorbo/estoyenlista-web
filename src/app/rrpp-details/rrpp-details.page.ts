import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { PartiesService } from '../services/parties.service';

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

  constructor(private clientService: ClientService, private partiesService: PartiesService) {
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
}
