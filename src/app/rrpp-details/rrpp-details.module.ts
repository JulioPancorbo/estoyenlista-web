import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RrppDetailsPageRoutingModule } from './rrpp-details-routing.module';

import { RrppDetailsPage } from './rrpp-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RrppDetailsPageRoutingModule
  ],
  declarations: [RrppDetailsPage]
})
export class RrppDetailsPageModule {}
