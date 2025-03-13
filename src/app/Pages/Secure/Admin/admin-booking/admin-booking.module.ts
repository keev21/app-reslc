import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminBookingPageRoutingModule } from './admin-booking-routing.module';

import { AdminBookingPage } from './admin-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminBookingPageRoutingModule
  ],
  declarations: [AdminBookingPage]
})
export class AdminBookingPageModule {}
