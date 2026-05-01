import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return router.navigate(['/login']);
  }

  // redirect to customer register if the user doesn't have a customer created yet
  if (authService.currentUser()?.role === 'CUSTOMER' && !authService.customer()) {
    // only redirect if we are not already going to the registration page
    if (state.url !== '/register-customer') {
      return router.navigate(['/register-customer']);
    }
  }

  return true;
};