import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAdminInventoryPage } from './edit-admin-inventory.page';

const routes: Routes = [
  {
    path: '',
    component: EditAdminInventoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAdminInventoryPageRoutingModule {}
