import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminBookingPage } from './admin-booking.page';

const routes: Routes = [
  {
    path: '',
    component: AdminBookingPage
  },  {
    path: 'modal-booking',
    loadChildren: () => import('./modal-booking/modal-booking.module').then( m => m.ModalBookingPageModule)
  },
  {
    path: 'modal-booking-user',
    loadChildren: () => import('./modal-booking-user/modal-booking-user.module').then( m => m.ModalBookingUserPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminBookingPageRoutingModule {}
