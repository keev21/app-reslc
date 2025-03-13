import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminInventoryPageRoutingModule } from './admin-inventory-routing.module';

import { AdminInventoryPage } from './admin-inventory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminInventoryPageRoutingModule
  ],
  declarations: [AdminInventoryPage]
})
export class AdminInventoryPageModule {}
