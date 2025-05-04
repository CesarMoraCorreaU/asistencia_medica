import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-appointment',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    template: `
    <div class="auth-page">
      <div class="container">
        <div class="auth-card">
          <h2>Reserva de Citas</h2>
          <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()" novalidate>
            <div class="form-group">
              <label for="name">Nombre Completo</label>
              <input 
                type="text" 
                id="name" 
                formControlName="name" 
                placeholder="Ingrese su nombre completo"
                [ngClass]="{'invalid': submitted && f['name'].errors}"
              >
              <div class="error-message" *ngIf="submitted && f['name'].errors">
                <span *ngIf="f['name'].errors['required']">El nombre es requerido</span>
              </div>
            </div>

            <div class="form-group">
              <label for="specialty">Especialidad</label>
              <select 
                id="specialty" 
                formControlName="specialty"
                [ngClass]="{'invalid': submitted && f['specialty'].errors}"
              >
                <option value="">Seleccione una especialidad</option>
                <option *ngFor="let specialty of specialties" [value]="specialty">
                  {{specialty}}
                </option>
              </select>
              <div class="error-message" *ngIf="submitted && f['specialty'].errors">
                <span *ngIf="f['specialty'].errors['required']">Seleccione una especialidad</span>
              </div>
            </div>

            <div class="form-group">
              <label for="appointmentDate">Fecha de Cita</label>
              <input 
                type="date" 
                id="appointmentDate" 
                formControlName="appointmentDate"
                [min]="minDate"
                [ngClass]="{'invalid': submitted && f['appointmentDate'].errors}"
              >
              <div class="error-message" *ngIf="submitted && f['appointmentDate'].errors">
                <span *ngIf="f['appointmentDate'].errors['required']">La fecha es requerida</span>
              </div>
            </div>

            <div class="form-group">
              <label for="appointmentType">Tipo de Consulta</label>
              <select 
                id="appointmentType" 
                formControlName="appointmentType"
                [ngClass]="{'invalid': submitted && f['appointmentType'].errors}"
              >
                <option value="">Seleccione el tipo de consulta</option>
                <option value="presential">Presencial</option>
                <option value="remote">Virtual</option>
              </select>
              <div class="error-message" *ngIf="submitted && f['appointmentType'].errors">
                <span *ngIf="f['appointmentType'].errors['required']">Seleccione el tipo de consulta</span>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="btn primary" [disabled]="loading">
                {{ loading ? 'Reservando...' : 'Reservar Cita' }}
              </button>
            </div>

            <div class="error-alert" *ngIf="error">
              {{ error }}
            </div>
          </form>

          <div class="auth-footer">
            <p>¿Ya tiene una cuenta? <a routerLink="/login">Iniciar Sesión</a></p>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    select {
      width: 100%;
      padding: var(--spacing-sm);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      background-color: white;
    }

    select.invalid {
      border-color: var(--error-color);
    }
  `]
})
export class AppointmentComponent implements OnInit {
    appointmentForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';
    specialties = ['Medicina General', 'Cardiología', 'Pediatría', 'Dermatología', 'Oftalmología'];
    minDate = new Date().toISOString().split('T')[0];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.appointmentForm = this.formBuilder.group({
            name: ['', Validators.required],
            specialty: ['', Validators.required],
            appointmentDate: ['', Validators.required],
            appointmentType: ['', Validators.required]
        });
    }

    get f() { return this.appointmentForm.controls; }

    onSubmit(): void {
        this.submitted = true;

        if (this.appointmentForm.invalid) {
            return;
        }

        this.loading = true;
        this.error = '';

        // Aquí iría la lógica para guardar la cita
        setTimeout(() => {
            this.loading = false;
            alert('Cita reservada exitosamente. Recibirá un correo de confirmación.');
            this.router.navigate(['/login']);
        }, 1500);
    }
}