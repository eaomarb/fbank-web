import { ApplicationConfig, provideZonelessChangeDetection, inject, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { Auth } from './core/services/auth';
import { catchError, firstValueFrom, of } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
    provideAppInitializer(async () => {
      const auth = inject(Auth);
      if (auth.isAuthenticated()) {
        try {
          const user = await firstValueFrom(auth.me());
          if (user && user.role === 'CUSTOMER') {
            await firstValueFrom(auth.checkCustomer(user.id).pipe(catchError(() => of(null))));
          }
        } catch (e) {
          console.error('App initialization failed', e);
        }
      }
    })
  ]
};