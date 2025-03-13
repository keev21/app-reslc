import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminFloorsPage } from './admin-floors.page';

const routes: Routes = [
  {
    path: '',
    component: AdminFloorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminFloorsPageRoutingModule {}
