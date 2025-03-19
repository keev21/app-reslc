import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRolesPage } from './admin-roles.page';

const routes: Routes = [
  {
    path: '',
    component: AdminRolesPage
  },  {
    path: 'role-modal',
    loadChildren: () => import('./role-modal/role-modal.module').then( m => m.RoleModalPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRolesPageRoutingModule {}
