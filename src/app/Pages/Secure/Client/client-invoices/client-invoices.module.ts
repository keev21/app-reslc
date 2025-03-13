import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientInvoicesPageRoutingModule } from './client-invoices-routing.module';

import { ClientInvoicesPage } from './client-invoices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientInvoicesPageRoutingModule
  ],
  declarations: [ClientInvoicesPage]
})
export class ClientInvoicesPageModule {}
