import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientBookingPage } from './client-booking.page';

const routes: Routes = [
  {
    path: '',
    component: ClientBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientBookingPageRoutingModule {}
