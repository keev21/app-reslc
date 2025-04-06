import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAdminProductsPage } from './edit-admin-products.page';

const routes: Routes = [
  {
    path: '',
    component: EditAdminProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAdminProductsPageRoutingModule {}
