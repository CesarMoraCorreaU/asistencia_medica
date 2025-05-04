import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="auth-page">
      <div class="container">
        <div class="auth-card">
          <h2>Login</h2>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
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
                placeholder="Enter your password"
                [ngClass]="{'invalid': submitted && f['password'].errors}"
              >
              <div class="error-message" *ngIf="submitted && f['password'].errors">
                <span *ngIf="f['password'].errors['required']">Password is required</span>
                <span *ngIf="f['password'].errors['minlength']">Password must be at least 6 characters</span>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn primary" [disabled]="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
              </button>
            </div>
            
            <div class="error-alert" *ngIf="error">
              {{ error }}
            </div>
          </form>
          
          <div class="auth-footer">
            <p>Don't have an account? <a routerLink="/register">Sign up</a></p>
            <p>¿Necesita una cita? <a routerLink="/appointment">Reservar Cita</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`/* Estilos van aquí */`]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    
    const { email, password } = this.loginForm.value;
    
    this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          this.error = err.message || 'Login failed';
          this.loading = false;
        }
      });
  }
}