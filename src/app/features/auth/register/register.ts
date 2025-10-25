import { Component, inject } from '@angular/core';
import { HomeNavbar } from "../../../shared/layout/home-navbar/home-navbar";
import { Footer } from '../../../shared/layout/footer/footer';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'register',
  imports: [HomeNavbar, Footer, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private http = inject(HttpClient);

  registerForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    repeatPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  }) as FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    username: FormControl<string>;
    repeatPassword: FormControl<string>;
  }>;

  constructor(private router: Router) { }


  register(): void {
    const { email, password, username, repeatPassword } = this.registerForm.getRawValue();

    if (password !== repeatPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.http.post('/api/auth/register', { email, password, username }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Registration failed', err)
    });
  }
}