import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddClientModalPage } from './add-client-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddClientModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddClientModalPageRoutingModule {}
