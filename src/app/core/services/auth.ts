import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export enum Role {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: Role;
}

export interface AuthenticationResponse {
  token: string;
  userId: string;
  email: string;
  displayName: string;
  role: Role;
}

export interface Customer {
  id: string;
  name: string;
  lastName: string;
  documentId: string;
  age: number;
  address: JSON;
  phone: number;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenKey = 'authToken';

  readonly currentUser = signal<User | null>(null);
  readonly customer = signal<Customer | null>(null);

  login(email: string, password: string): Observable<AuthenticationResponse> {
    return this.httpClient
      .post<AuthenticationResponse>('/api/auth/login', { email, password })
      .pipe(
        tap((response) => {
          this.handleAuthResponse(response);
        }),
      );
  }

  register(email: string, username: string, password: string): Observable<AuthenticationResponse> {
    return this.httpClient
      .post<AuthenticationResponse>('/api/auth/register', { email, username, password })
      .pipe(
        tap((response) => {
          this.handleAuthResponse(response);
        }),
      );
  }

  private handleAuthResponse(response: AuthenticationResponse): void {
    if (response.token) {
      this.setToken(response.token);
      this.currentUser.set({
        id: response.userId,
        email: response.email,
        displayName: response.displayName,
        role: response.role,
      });
    }
  }

  checkCustomer(userId: string): Observable<Customer> {
    return this.httpClient.get<Customer>(`/api/customers/user/${userId}`).pipe(
      tap((customer) => {
        this.customer.set(customer);
      }),
    );
  }

  me(): Observable<User> {
    return this.httpClient.get<User>('/api/users/me').pipe(
      tap((user) => {
        this.currentUser.set(user);
      }),
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() < exp;
    } catch (e) {
      return false;
    }
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user;
    } catch (e) {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }
}
