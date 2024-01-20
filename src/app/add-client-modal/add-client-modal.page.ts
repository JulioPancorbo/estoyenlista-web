import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ClientService } from '../services/client.service';


@Component({
  selector: 'app-add-client-modal',
  templateUrl: './add-client-modal.page.html',
  styleUrls: ['./add-client-modal.page.scss'],
})
export class AddClientModalPage implements OnInit {

  newClient = { name: "", guests: 0 };

  constructor(
    private modalController: ModalController,
    private clientService: ClientService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  saveClient() {
    // Validaciones y lógica para guardar el nuevo cliente

    if (this.newClient.name == "") {
      alert("El nombre del cliente no puede estar vacío");
      return;
    }

    this.clientService.addClient(this.newClient).then((res) => {
      if (res === true) {
        this.alertCtrl.create({
          header: "¡Genial!",
          message: "El cliente se ha creado correctamente",
          buttons: [{
            text: "OK",
            handler: () => {
              //
            }
          }]
        }).then((alert) => {
          alert.present();
        });

        this.modalController.dismiss(this.newClient);
      } else {
        alert("Error al crear el cliente");
      }
    });

  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
