import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'home-navbar',
  imports: [RouterLink],
  templateUrl: './home-navbar.html',
  styleUrl: './home-navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeNavbar {
  private readonly authService = inject(Auth);

  readonly isAuthenticated = computed(() => this.authService.currentUser() !== null);
  readonly hasCustomer = computed(() => this.authService.customer() !== null);
}