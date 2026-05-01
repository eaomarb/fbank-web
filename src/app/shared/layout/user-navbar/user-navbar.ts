import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'user-navbar',
  imports: [],
  templateUrl: './user-navbar.html',
  styleUrl: './user-navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNavbar {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly currentUser = this.auth.currentUser;

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}