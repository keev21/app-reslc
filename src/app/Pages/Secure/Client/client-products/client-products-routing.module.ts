import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientProductsPage } from './client-products.page';

const routes: Routes = [
  {
    path: '',
    component: ClientProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientProductsPageRoutingModule {}
