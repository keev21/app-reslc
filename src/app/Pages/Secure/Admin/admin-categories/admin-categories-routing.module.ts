import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCategoriesPage } from './admin-categories.page';

const routes: Routes = [
  {
    path: '',
    component: AdminCategoriesPage
  },  {
    path: 'category-modal',
    loadChildren: () => import('./category-modal/category-modal.module').then( m => m.CategoryModalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCategoriesPageRoutingModule {}
