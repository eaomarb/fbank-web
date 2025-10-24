import { Component } from '@angular/core';
import { HomeNavbar } from "../../../shared/layout/home-navbar/home-navbar";
import { Router, RouterLink } from '@angular/router';
import { Footer } from '../../../shared/layout/footer/footer';
import { Auth } from '../../../core/services/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  imports: [HomeNavbar, RouterLink, Footer, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  }) as FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;


  constructor(private auth: Auth, private router: Router) {

  }

  login(): void {
    const { email, password } = this.loginForm.getRawValue();
    this.auth.login(email, password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => console.error('Login failed', err)
    })
  }
}
