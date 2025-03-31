import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAdminBranchPage } from './edit-admin-branch.page';

const routes: Routes = [
  {
    path: '',
    component: EditAdminBranchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAdminBranchPageRoutingModule {}
