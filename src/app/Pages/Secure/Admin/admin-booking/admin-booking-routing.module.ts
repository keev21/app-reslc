import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminBookingPage } from './admin-booking.page';

const routes: Routes = [
  {
    path: '',
    component: AdminBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminBookingPageRoutingModule {}
