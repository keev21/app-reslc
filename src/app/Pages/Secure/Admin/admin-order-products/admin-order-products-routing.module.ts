import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminOrderProductsPage } from './admin-order-products.page';

const routes: Routes = [
  {
    path: '',
    component: AdminOrderProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminOrderProductsPageRoutingModule {}
