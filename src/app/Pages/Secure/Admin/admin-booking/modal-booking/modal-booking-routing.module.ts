import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalBookingPage } from './modal-booking.page';

const routes: Routes = [
  {
    path: '',
    component: ModalBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalBookingPageRoutingModule {}
