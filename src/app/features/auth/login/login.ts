import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HomeNavbar } from "../../../shared/layout/home-navbar/home-navbar";
import { Router, RouterLink } from '@angular/router';
import { Footer } from '../../../shared/layout/footer/footer';
import { Auth } from '../../../core/services/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  imports: [HomeNavbar, RouterLink, Footer, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  }) as FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.getRawValue();

    this.auth.login(email, password).subscribe({
      next: (response) => {
        this.auth.checkCustomer(response.userId).subscribe({
          next: () => this.router.navigate(['/dashboard']),
          error: () => this.router.navigate(['/register-customer'])
        });
      },
      error: (err) => {
        console.error('Login error details:', err);
      }
    });
  }
}