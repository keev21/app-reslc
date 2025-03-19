import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTablesPage } from './admin-tables.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTablesPage
  },  {
    path: 'table-modal',
    loadChildren: () => import('./table-modal/table-modal.module').then( m => m.TableModalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTablesPageRoutingModule {}
