import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'home-navbar',
  imports: [RouterLink],
  templateUrl: './home-navbar.html',
  styleUrl: './home-navbar.css'
})
export class HomeNavbar {
  private authService = inject(Auth);

  isAuthenticated: boolean = this.authService.isAuthenticated();
}