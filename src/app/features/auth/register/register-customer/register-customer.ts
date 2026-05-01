import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Footer } from "../../../../shared/layout/footer/footer";
import { HomeNavbar } from "../../../../shared/layout/home-navbar/home-navbar";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../../../core/services/auth';

@Component({
  selector: 'register-customer',
  imports: [Footer, HomeNavbar, ReactiveFormsModule],
  templateUrl: './register-customer.html',
  styleUrl: './register-customer.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterCustomer {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly errorMessage = signal<string | null>(null);

  readonly registerCustomerForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    documentId: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    age: new FormControl<number | null>(null, { nonNullable: true, validators: [Validators.required, Validators.min(18)] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(9), Validators.maxLength(9)] }),
    streetName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    streetNumber: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    floor: new FormControl(''),
    door: new FormControl(''),
    postalCode: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5), Validators.maxLength(5)] }),
    city: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    province: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  }) as FormGroup<{
    name: FormControl<string>;
    lastName: FormControl<string>;
    documentId: FormControl<string>;
    age: FormControl<number>;
    phone: FormControl<string>;
    streetName: FormControl<string>;
    streetNumber: FormControl<string>;
    floor: FormControl<string>;
    door: FormControl<string>;
    postalCode: FormControl<string>;
    city: FormControl<string>;
    province: FormControl<string>;
  }>;

  isFieldInvalid(fieldName: keyof typeof this.registerCustomerForm.controls): boolean {
    const control = this.registerCustomerForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  registerCustomer(): void {
    this.errorMessage.set(null);

    if (this.registerCustomerForm.invalid) {
      this.errorMessage.set('Please check the form fields for errors.');
      this.registerCustomerForm.markAllAsTouched();
      return;
    }

    const val = this.registerCustomerForm.getRawValue();
    const userId = this.auth.currentUser()?.id;

    if (!userId) {
      this.errorMessage.set('User session not found. Please login again.');
      this.router.navigate(['/login']);
      return;
    }

    const customerData = {
      name: val.name,
      lastName: val.lastName,
      documentId: val.documentId,
      age: val.age,
      phone: val.phone,
      address: {
        streetName: val.streetName,
        streetNumber: val.streetNumber,
        floor: val.floor,
        door: val.door,
        postalCode: val.postalCode,
        city: val.city,
        province: val.province
      }
    };

    this.http.post<any>(`/api/customers/${userId}`, customerData).subscribe({
      next: (response) => {
        this.auth.customer.set(response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        const msg = err.message || 'Registration failed. Please try again.';
        this.errorMessage.set(msg);
        
        if (msg.toLowerCase().includes('nif') || msg.toLowerCase().includes('document')) {
          this.registerCustomerForm.get('documentId')?.setErrors({ serverError: true });
        }
      }
    });
  }
}
