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
    loadComponent: () => import('./features/auth/register/register-user/register-user').then(m => m.RegisterUser)
  },
  {
    path: 'register-customer',
    loadComponent: () => import('./features/auth/register/register-customer/register-customer').then(m => m.RegisterCustomer)
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