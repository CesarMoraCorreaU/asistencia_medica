import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-page">
      <div class="container">
        <div class="auth-card">
          <h2>Create Account</h2>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" novalidate>
            <div class="form-group">
              <label for="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                formControlName="name" 
                placeholder="Enter your full name"
                [ngClass]="{'invalid': submitted && f['name'].errors}"
              >
              <div class="error-message" *ngIf="submitted && f['name'].errors">
                <span *ngIf="f['name'].errors['required']">Name is required</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email" 
                placeholder="Enter your email"
                [ngClass]="{'invalid': submitted && f['email'].errors}"
              >
              <div class="error-message" *ngIf="submitted && f['email'].errors">
                <span *ngIf="f['email'].errors['required']">Email is required</span>
                <span *ngIf="f['email'].errors['email']">Please enter a valid email</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                formControlName="password" 
                placeholder="Choose a password"
                [ngClass]="{'invalid': submitted && f['password'].errors}"
              >
              <div class="error-message" *ngIf="submitted && f['password'].errors">
                <span *ngIf="f['password'].errors['required']">Password is required</span>
                <span *ngIf="f['password'].errors['minlength']">Password must be at least 6 characters</span>
              </div>
            </div>
            
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                formControlName="confirmPassword" 
                placeholder="Confirm your password"
                [ngClass]="{'invalid': submitted && f['confirmPassword'].errors}"
              >
              <div class="error-message" *ngIf="submitted && f['confirmPassword'].errors">
                <span *ngIf="f['confirmPassword'].errors['required']">Please confirm your password</span>
                <span *ngIf="f['confirmPassword'].errors['mustMatch']">Passwords must match</span>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn primary" [disabled]="loading">
                {{ loading ? 'Creating account...' : 'Create Account' }}
              </button>
            </div>
            
            <div class="error-alert" *ngIf="error">
              {{ error }}
            </div>
          </form>
          
          <div class="auth-footer">
            <p>Already have an account? <a routerLink="/login">Sign in</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`/* Estilos van aquí */`]
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  // custom validator to check that two fields match
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
  
      // Asegurarse de que matchingControl.errors sea un objeto y tenga la propiedad mustMatch
      if (matchingControl.errors && !(matchingControl.errors as any).mustMatch) {
        return;
      }
  
      // Si los valores no coinciden, establece un error en matchingControl
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null); // Elimina el error si las contraseñas coinciden
      }
    };
  }  
  
  onSubmit(): void {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    
    const { name, email, password } = this.registerForm.value;
    
    this.authService.register(name, email, password)
      .subscribe({
        next: () => {
          this.router.navigate(['/login'], { queryParams: { registered: true }});
        },
        error: err => {
          this.error = err.message || 'Registration failed';
          this.loading = false;
        }
      });
  }
}