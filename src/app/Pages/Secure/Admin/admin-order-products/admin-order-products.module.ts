import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminOrderProductsPageRoutingModule } from './admin-order-products-routing.module';

import { AdminOrderProductsPage } from './admin-order-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminOrderProductsPageRoutingModule
  ],
  declarations: [AdminOrderProductsPage]
})
export class AdminOrderProductsPageModule {}
