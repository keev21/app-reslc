import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule)
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
