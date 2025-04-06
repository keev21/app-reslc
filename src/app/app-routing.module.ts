import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'login',
    loadChildren: () => import('./Pages/Public/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'user-register',
    loadChildren: () => import('./Pages/Public/user-register/user-register.module').then( m => m.UserRegisterPageModule)
  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./Pages/Public/password-recovery/password-recovery.module').then( m => m.PasswordRecoveryPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./Pages/Public/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'check-token',
    loadChildren: () => import('./Pages/Public/check-token/check-token.module').then( m => m.CheckTokenPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/Secure/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'client-profile',
    loadChildren: () => import('./Pages/Secure/Client/client-profile/client-profile.module').then( m => m.ClientProfilePageModule)
  },
  {
    path: 'client-categories',
    loadChildren: () => import('./Pages/Secure/Client/client-categories/client-categories.module').then( m => m.ClientCategoriesPageModule)
  },
  {
    path: 'client-booking',
    loadChildren: () => import('./Pages/Secure/Client/client-booking/client-booking.module').then( m => m.ClientBookingPageModule)
  },
  {
    path: 'client-products',
    loadChildren: () => import('./Pages/Secure/Client/client-products/client-products.module').then( m => m.ClientProductsPageModule)
  },
  {
    path: 'client-invoices',
    loadChildren: () => import('./Pages/Secure/Client/client-invoices/client-invoices.module').then( m => m.ClientInvoicesPageModule)
  },
  {
    path: 'admin-branch',
    loadChildren: () => import('./Pages/Secure/Admin/admin-branch/admin-branch.module').then( m => m.AdminBranchPageModule)
  },
  {
    path: 'admin-floors',
    loadChildren: () => import('./Pages/Secure/Admin/admin-floors/admin-floors.module').then( m => m.AdminFloorsPageModule)
  },
  {
    path: 'admin-inventory',
    loadChildren: () => import('./Pages/Secure/Admin/admin-inventory/admin-inventory.module').then( m => m.AdminInventoryPageModule)
  },
  {
    path: 'admin-categories',
    loadChildren: () => import('./Pages/Secure/Admin/admin-categories/admin-categories.module').then( m => m.AdminCategoriesPageModule)
  },
  {
    path: 'admin-invoices',
    loadChildren: () => import('./Pages/Secure/Admin/admin-invoices/admin-invoices.module').then( m => m.AdminInvoicesPageModule)
  },
  {
    path: 'admin-users',
    loadChildren: () => import('./Pages/Secure/Admin/admin-users/admin-users.module').then( m => m.AdminUsersPageModule)
  },
  {
    path: 'admin-recipes',
    loadChildren: () => import('./Pages/Secure/Admin/admin-recipes/admin-recipes.module').then( m => m.AdminRecipesPageModule)
  },
  {
    path: 'admin-products',
    loadChildren: () => import('./Pages/Secure/Admin/admin-products/admin-products.module').then( m => m.AdminProductsPageModule)
  },
  {
    path: 'admin-booking',
    loadChildren: () => import('./Pages/Secure/Admin/admin-booking/admin-booking.module').then( m => m.AdminBookingPageModule)
  },
  {
    path: 'edit-admin-floors',
    loadChildren: () => import('./Pages/Secure/Admin/edit-admin-floors/edit-admin-floors.module').then( m => m.EditAdminFloorsPageModule)
  },
  {
    path: 'edit-admin-branch',
    loadChildren: () => import('./Pages/Secure/Admin/edit-admin-branch/edit-admin-branch.module').then( m => m.EditAdminBranchPageModule)
  },
  {
    path: 'admin-inventory',
    loadChildren: () => import('./Pages/Secure/Admin/admin-inventory/admin-inventory.module').then( m => m.AdminInventoryPageModule)
  },
  {
    path: 'edit-admin-inventory',
    loadChildren: () => import('./Pages/Secure/Admin/edit-admin-inventory/edit-admin-inventory.module').then( m => m.EditAdminInventoryPageModule)
  },
  {
    path: 'admin-invoices',
    loadChildren: () => import('./Pages/Secure/Admin/admin-invoices/admin-invoices.module').then( m => m.AdminInvoicesPageModule)
  },
  {
    path: 'admin-users',
    loadChildren: () => import('./Pages/Secure/Admin/admin-users/admin-users.module').then( m => m.AdminUsersPageModule)
  },
  {
    path: 'admin-recipes',
    loadChildren: () => import('./Pages/Secure/Admin/admin-recipes/admin-recipes.module').then( m => m.AdminRecipesPageModule)
  },
  {
    path: 'admin-products',
    loadChildren: () => import('./Pages/Secure/Admin/admin-products/admin-products.module').then( m => m.AdminProductsPageModule)
  },
  {
    path: 'admin-booking',
    loadChildren: () => import('./Pages/Secure/Admin/admin-booking/admin-booking.module').then( m => m.AdminBookingPageModule)
  },
  {
    path: 'admin-tables',
    loadChildren: () => import('./Pages/Secure/Admin/admin-tables/admin-tables.module').then( m => m.AdminTablesPageModule)
  },
  {
    path: 'admin-roles',
    loadChildren: () => import('./Pages/Secure/Admin/admin-roles/admin-roles.module').then( m => m.AdminRolesPageModule)
  },  {
    path: 'edit-admin-products',
    loadChildren: () => import('./Pages/Secure/Admin/edit-admin-products/edit-admin-products.module').then( m => m.EditAdminProductsPageModule)
  },

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
