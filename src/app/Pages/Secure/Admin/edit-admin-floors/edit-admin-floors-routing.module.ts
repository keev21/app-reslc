import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAdminFloorsPage } from './edit-admin-floors.page';

const routes: Routes = [
  {
    path: '',
    component: EditAdminFloorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAdminFloorsPageRoutingModule {}
