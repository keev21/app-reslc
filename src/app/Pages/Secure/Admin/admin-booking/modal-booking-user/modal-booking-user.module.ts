import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBookingUserPageRoutingModule } from './modal-booking-user-routing.module';

import { ModalBookingUserPage } from './modal-booking-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBookingUserPageRoutingModule
  ],
  declarations: [ModalBookingUserPage]
})
export class ModalBookingUserPageModule {}
