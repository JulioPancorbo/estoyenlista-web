import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllClientsPageRoutingModule } from './all-clients-routing.module';

import { AllClientsPage } from './all-clients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllClientsPageRoutingModule
  ],
  declarations: [AllClientsPage]
})
export class AllClientsPageModule {}
