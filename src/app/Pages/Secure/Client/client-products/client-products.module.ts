import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientProductsPageRoutingModule } from './client-products-routing.module';

import { ClientProductsPage } from './client-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientProductsPageRoutingModule
  ],
  declarations: [ClientProductsPage]
})
export class ClientProductsPageModule {}
