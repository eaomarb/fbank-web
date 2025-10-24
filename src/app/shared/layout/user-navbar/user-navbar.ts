import { Component } from '@angular/core';
import { Footer } from "../footer/footer";
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'user-navbar',
  imports: [Footer, RouterLink],
  templateUrl: './user-navbar.html',
  styleUrl: './user-navbar.css'
})
export class UserNavbar {
  constructor(private auth: Auth, private router: Router) { }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}