import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRecipesPage } from './admin-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: AdminRecipesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRecipesPageRoutingModule {}
