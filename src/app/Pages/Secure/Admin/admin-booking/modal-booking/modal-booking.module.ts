import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBookingPageRoutingModule } from './modal-booking-routing.module';

import { ModalBookingPage } from './modal-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBookingPageRoutingModule
  ],
  declarations: [ModalBookingPage]
})
export class ModalBookingPageModule {}
