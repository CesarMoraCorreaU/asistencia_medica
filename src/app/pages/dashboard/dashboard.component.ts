import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../components/card/card.component';
import { HealthcareService } from '../../services/healthcare.service';
import { Doctor, Appointment, Activity, Stats } from '../../interfaces/healthcare.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  template: ` 
    <div class="dashboard-page">
      <div class="container">
        <header class="dashboard-header">
          <h1>Panel de Control Médico demo</h1>
          <div class="user-info" *ngIf="user">
            <span>Bienvenido, Dr. {{ user.name }}</span>
          </div>
        </header>
        
        <div class="dashboard-content">
          <div class="row">
            <div class="col">
              <app-card title="Resumen" [hover]="true">
                <div class="stats-grid">
                  <div class="stat-item">
                    <div class="stat-value">{{ stats.appointments || 0 }}</div>
                    <div class="stat-label">Citas Pendientes</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-value">{{ stats.patients || 0 }}</div>
                    <div class="stat-label">Pacientes</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-value">{{ stats.prescriptions || 0 }}</div>
                    <div class="stat-label">Recetas</div>
                  </div>
                </div>
              </app-card>
            </div>
            
            <div class="col">
              <app-card title="Actividad Reciente" [hover]="true">
                <div class="activity-list" *ngIf="activities.length; else noActivity">
                  <div class="activity-item" *ngFor="let activity of activities">
                    <div class="activity-icon" [ngClass]="activity.type"></div>
                    <div class="activity-content">
                      <div class="activity-message">{{ activity.message }}</div>
                      <div class="activity-time">{{ activity.time }}</div>
                    </div>
                  </div>
                </div>
                <ng-template #noActivity>
                  <p class="no-data">Sin actividad reciente</p>
                </ng-template>
              </app-card>
            </div>
          </div>
          
          <div class="row mt-lg">
            <div class="col">
              <app-card title="Próximas Citas" [hover]="true">
                <div class="appointments-list" *ngIf="appointments.length; else noAppointments">
                  <div class="appointment-item" *ngFor="let appointment of appointments">
                    <div class="appointment-status" [ngClass]="appointment.type">
                      {{ appointment.type === 'remote' ? 'Virtual' : 'Presencial' }}
                    </div>
                    <div class="appointment-content">
                      <div class="appointment-patient">{{ appointment.patientName }}</div>
                      <div class="appointment-time">{{ appointment.dateTime }}</div>
                      <div class="appointment-reason">{{ appointment.reason }}</div>
                    </div>
                    <div class="appointment-actions">
                      <button class="btn primary" (click)="startConsultation(appointment)">
                        Iniciar
                      </button>
                      <button class="btn outline" (click)="rescheduleAppointment(appointment)">
                        Reprogramar
                      </button>
                    </div>
                  </div>
                </div>
                <ng-template #noAppointments>
                  <p class="no-data">No hay citas programadas</p>
                </ng-template>
              </app-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page {
      padding: var(--spacing-xl) 0;
    }
    
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-xl);
    }
    
    .user-info {
      font-weight: var(--font-weight-medium);
      color: var(--primary-color);
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-md);
    }
    
    .stat-item {
      text-align: center;
      padding: var(--spacing-md);
      background-color: rgba(10, 132, 255, 0.05);
      border-radius: var(--radius-md);
    }
    
    .stat-value {
      font-size: 2rem;
      font-weight: var(--font-weight-bold);
      color: var(--primary-color);
    }
    
    .stat-label {
      color: var(--text-secondary);
      margin-top: var(--spacing-xs);
    }
    
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }
    
    .activity-item {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-sm);
    }
    
    .activity-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .activity-icon.created {
      background-color: var(--primary-color-light);
    }
    
    .activity-icon.completed {
      background-color: var(--secondary-color-light);
    }
    
    .activity-icon.updated {
      background-color: var(--accent-color-light);
    }
    
    .activity-content {
      flex: 1;
    }
    
    .activity-message {
      font-weight: var(--font-weight-medium);
    }
    
    .activity-time {
      font-size: 0.875rem;
      color: var(--text-tertiary);
    }
    
    .tasks-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }
    
    .task-item {
      display: flex;
      align-items: center;
      padding: var(--spacing-sm);
      border-radius: var(--radius-md);
      background-color: var(--background-color);
      transition: background-color 0.2s ease;
    }
    
    .task-item:hover {
      background-color: var(--border-color);
    }
    
    .task-checkbox {
      margin-right: var(--spacing-sm);
    }
    
    .task-checkbox input {
      display: none;
    }
    
    .task-checkbox label {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid var(--primary-color);
      border-radius: var(--radius-sm);
      cursor: pointer;
      position: relative;
    }
    
    .task-checkbox input:checked + label::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--primary-color);
      font-size: 14px;
    }
    
    .task-content {
      flex: 1;
    }
    
    .task-content.completed .task-title {
      text-decoration: line-through;
      color: var(--text-tertiary);
    }
    
    .task-title {
      font-weight: var(--font-weight-medium);
    }
    
    .task-due {
      font-size: 0.875rem;
      color: var(--text-tertiary);
    }
    
    .task-actions {
      display: flex;
    }
    
    .task-delete {
      background: none;
      border: none;
      color: var(--error-color);
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.2s ease;
    }
    
    .task-delete:hover {
      opacity: 1;
    }
    
    .add-task-form {
      display: flex;
      gap: var(--spacing-sm);
    }
    
    .add-task-form input {
      flex: 1;
    }
    
    .no-data {
      text-align: center;
      padding: var(--spacing-md);
      color: var(--text-tertiary);
    }
    
    .btn {
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-md);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .btn.primary {
      background-color: var(--primary-color);
      color: white;
    }
    
    .btn.primary:hover:not(:disabled) {
      background-color: var(--primary-color-dark);
    }
    
    .btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .mt-md {
      margin-top: var(--spacing-md);
    }
    
    .mt-lg {
      margin-top: var(--spacing-lg);
    }
    
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
        gap: var(--spacing-sm);
      }
      
      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-sm);
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  user: Doctor | null = null;
  appointments: Appointment[] = [];
  activities: Activity[] = [];
  stats: Stats = {
    appointments: 0,
    patients: 0,
    prescriptions: 0
  };

  constructor(private healthcareService: HealthcareService) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadAppointments();
    this.loadActivities();
    this.loadStats();
  }

  loadUserProfile(): void {
    this.healthcareService.getDoctorProfile().subscribe(
      (data: Doctor) => {
        this.user = data;
      },
      (error: Error) => {
        console.error('Error cargando perfil:', error);
      }
    );
  }

  loadAppointments(): void {
    this.healthcareService.getUpcomingAppointments().subscribe(
      (data: Appointment[]) => {
        this.appointments = data;
      },
      (error: Error) => {
        console.error('Error cargando citas:', error);
      }
    );
  }

  loadActivities(): void {
    this.healthcareService.getRecentActivities().subscribe(
      (data: Activity[]) => {
        this.activities = data;
      },
      (error: Error) => {
        console.error('Error cargando actividades:', error);
      }
    );
  }

  loadStats(): void {
    this.healthcareService.getDoctorStats().subscribe(
      (data: Stats) => {
        this.stats = data;
      },
      (error: Error) => {
        console.error('Error cargando estadísticas:', error);
      }
    );
  }

  startConsultation(appointment: Appointment): void {
    this.healthcareService.startConsultation(appointment.id).subscribe(
      () => {
        // Redirigir a la página de consulta
        // this.router.navigate(['/consultation', appointment.id]);
      },
      (error: Error) => {
        console.error('Error iniciando consulta:', error);
      }
    );
  }

  rescheduleAppointment(appointment: Appointment): void {
    // Implementation pending
  }
}