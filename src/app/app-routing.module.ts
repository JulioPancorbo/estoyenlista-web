import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard] // Protege la ruta
  },  
  {
    path: 'add-client-modal',
    loadChildren: () => import('./add-client-modal/add-client-modal.module').then( m => m.AddClientModalPageModule),
    canActivate: [AuthGuard] // Protege la ruta
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard] // Protege la ruta
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./home-admin/home-admin.module').then( m => m.HomeAdminPageModule),
    canActivate: [AuthGuard] // Protege la ruta
  },
  {
    path: 'rrpp-details',
    loadChildren: () => import('./rrpp-details/rrpp-details.module').then( m => m.RrppDetailsPageModule),
    canActivate: [AuthGuard] // Protege la ruta
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
