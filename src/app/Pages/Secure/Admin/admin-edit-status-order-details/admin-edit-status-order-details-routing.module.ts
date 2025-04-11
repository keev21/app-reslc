import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEditStatusOrderDetailsPage } from './admin-edit-status-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: AdminEditStatusOrderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEditStatusOrderDetailsPageRoutingModule {}
