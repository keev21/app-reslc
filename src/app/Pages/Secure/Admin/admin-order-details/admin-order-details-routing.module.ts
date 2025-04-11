import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminOrderDetailsPage } from './admin-order-details.page';

const routes: Routes = [
  {
    path: '',
    component: AdminOrderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminOrderDetailsPageRoutingModule {}
