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

  ngOnInit() {}

  ionViewDidEnter() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.authService.getUserProfile().subscribe((data) => {
      this.user = data;      
      console.log('user', this.user);
      console.log('userid', this.user.id);

      if(this.user) {
        this.getParties();
        this.getRRPPs();
      }
    });
  }

  getParties() {
    this.partiesService.getAllParties().subscribe((parties) => {
      console.log('parties', parties);
      this.parties = parties;
    });
  }

  getRRPPs() {
    this.partiesService.getRRPPs().subscribe((rrpps) => {
      console.log('rrpps', rrpps);
      this.rrpps = rrpps;
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
