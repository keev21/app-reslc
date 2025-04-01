import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableModalPage } from './table-modal.page';

const routes: Routes = [
  {
    path: '',
    component: TableModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableModalPageRoutingModule {}
