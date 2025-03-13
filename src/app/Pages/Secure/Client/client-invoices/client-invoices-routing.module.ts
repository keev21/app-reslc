import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientInvoicesPage } from './client-invoices.page';

const routes: Routes = [
  {
    path: '',
    component: ClientInvoicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientInvoicesPageRoutingModule {}
