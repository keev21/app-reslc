import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientCategoriesPage } from './client-categories.page';

const routes: Routes = [
  {
    path: '',
    component: ClientCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientCategoriesPageRoutingModule {}
