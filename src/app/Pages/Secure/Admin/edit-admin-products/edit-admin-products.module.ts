import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAdminProductsPageRoutingModule } from './edit-admin-products-routing.module';

import { EditAdminProductsPage } from './edit-admin-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAdminProductsPageRoutingModule
  ],
  declarations: [EditAdminProductsPage]
})
export class EditAdminProductsPageModule {}
