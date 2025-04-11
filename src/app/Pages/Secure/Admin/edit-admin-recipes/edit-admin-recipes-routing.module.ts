import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAdminRecipesPage } from './edit-admin-recipes.page';

const routes: Routes = [
  {
    path: '',
    component: EditAdminRecipesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAdminRecipesPageRoutingModule {}
