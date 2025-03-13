import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientBookingPageRoutingModule } from './client-booking-routing.module';

import { ClientBookingPage } from './client-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientBookingPageRoutingModule
  ],
  declarations: [ClientBookingPage]
})
export class ClientBookingPageModule {}
