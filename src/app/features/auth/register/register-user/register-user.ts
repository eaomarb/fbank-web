import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HomeNavbar } from "../../../../shared/layout/home-navbar/home-navbar";
import { Footer } from '../../../../shared/layout/footer/footer';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../../core/services/auth';

@Component({
  selector: 'register-user',
  imports: [HomeNavbar, Footer, RouterLink, ReactiveFormsModule],
  templateUrl: './register-user.html',
  styleUrl: './register-user.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterUser {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly registerForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    repeatPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  }) as FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    username: FormControl<string>;
    repeatPassword: FormControl<string>;
  }>;

  registerUser(): void {
    if (this.registerForm.invalid) {
      console.warn('Form is invalid:', this.registerForm.errors, this.registerForm.value);
      alert('Please fill in all fields correctly.');
      return;
    }

    const { email, password, username, repeatPassword } = this.registerForm.getRawValue();

    if (password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    this.auth.register(email, username, password).subscribe({
      next: () => this.router.navigate(['/register-customer']),
      error: (err) => {
        console.error('Registration failed:', err);
      }
    });
  }
}