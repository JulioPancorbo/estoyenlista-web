import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RrppDetailsPage } from './rrpp-details.page';

const routes: Routes = [
  {
    path: '',
    component: RrppDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RrppDetailsPageRoutingModule {}
