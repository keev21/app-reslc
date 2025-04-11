import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEditStatusOrderDetailsPageRoutingModule } from './admin-edit-status-order-details-routing.module';

import { AdminEditStatusOrderDetailsPage } from './admin-edit-status-order-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminEditStatusOrderDetailsPageRoutingModule
  ],
  declarations: [AdminEditStatusOrderDetailsPage]
})
export class AdminEditStatusOrderDetailsPageModule {}
