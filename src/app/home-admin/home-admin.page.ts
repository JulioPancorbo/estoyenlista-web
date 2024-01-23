import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  AlertController,
  NavController,
  LoadingController,
} from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ClientService } from '../services/client.service';
import { PartiesService } from '../services/parties.service';

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
  public parties: any;
  public rrpps: any;

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
      this.getAdminInfo(loading);
    }
  }

  async getAdminInfo(loading) {
    this.getParties();
    this.getRRPPs(loading);
  }

  getParties() {
    this.partiesService.getAllParties().subscribe((parties) => {
      console.log('parties', parties);
      this.parties = parties;
    });
  }

  getRRPPs(loading) {
    this.partiesService.getRRPPs().subscribe((rrpps) => {
      console.log('rrpps', rrpps);
      this.rrpps = rrpps;
      loading.dismiss(); // Dismiss the loading controller
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
