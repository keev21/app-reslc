import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAdminInventoryPageRoutingModule } from './edit-admin-inventory-routing.module';

import { EditAdminInventoryPage } from './edit-admin-inventory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAdminInventoryPageRoutingModule
  ],
  declarations: [EditAdminInventoryPage]
})
export class EditAdminInventoryPageModule {}
