import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { authenticatedGuard } from './core/guards/authenticated-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
    canActivate: [authenticatedGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then((m) => m.Home)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
  },
];