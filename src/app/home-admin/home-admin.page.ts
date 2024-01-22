import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  AlertController,
  NavController,
  LoadingController,
} from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {
  public currentUser: any;
  public user: any;
  public clients: any[] = [];
  public filteredClients: any[] = [];
  public searchTerm: string = '';
  public partySelected: any;
  public rrppSelected: any;
  public isAPartySelected: boolean = false;
  public isARrppSelected: boolean = false;  
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
  public rrpps: any[] = [
    {
      id: 1,
      name: 'Juanito Pérez',
      surname: 'Apellido 1',
      email: 'prueba@email.com',
    },
    {
      id: 2,
      name: 'RRPP 2',
      surname: 'Apellido 2',
      email: 'prueba2@email.com',
    },
    {
      id: 3,
      name: 'Laura',
      surname: 'Apellido 3',
      email: 'prueba3@email.com',
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

  selectParty(party) {
    console.log('party', party);
    this.isAPartySelected = true;
    if (party.id) {
      this.partySelected = party;
    }
  }

  selectRrpp(rrpp) {
    console.log('rrpp', rrpp);
    this.isARrppSelected = true;
    if (rrpp.id) {
      this.rrppSelected = rrpp;
      //go to rrpp page
      this.navCtrl.navigateForward(['/rrpp-details'], {
        state: { rrppId: rrpp.id, partyId: this.partySelected.id },
      });
    }
  }
}
