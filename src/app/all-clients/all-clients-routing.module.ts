import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllClientsPage } from './all-clients.page';

const routes: Routes = [
  {
    path: '',
    component: AllClientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllClientsPageRoutingModule {}
