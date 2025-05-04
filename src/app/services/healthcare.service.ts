import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Doctor, Appointment, Activity, Stats } from '../interfaces/healthcare.interface';

@Injectable({
  providedIn: 'root'
})
export class HealthcareService {
  // Mock data for development
  private mockDoctor: Doctor = {
    id: '1',
    name: 'Dr. Carlos Rodríguez',
    specialty: 'Medicina General',
    email: 'carlos.rodriguez@hospital.com'
  };

  private mockAppointments: Appointment[] = [
    {
      id: '1',
      patientName: 'Juan Pérez',
      dateTime: '2024-03-20 09:00',
      type: 'presential',
      reason: 'Consulta General',
      status: 'pending'
    },
    {
      id: '2',
      patientName: 'María García',
      dateTime: '2024-03-20 10:30',
      type: 'remote',
      reason: 'Seguimiento',
      status: 'confirmed'
    }
  ];

  private mockActivities: Activity[] = [
    {
      id: '1',
      type: 'created',
      message: 'Nueva cita programada con Juan Pérez',
      time: 'Hace 2 horas'
    },
    {
      id: '2',
      type: 'completed',
      message: 'Consulta finalizada con María García',
      time: 'Hace 1 día'
    }
  ];

  private mockStats: Stats = {
    appointments: 5,
    patients: 120,
    prescriptions: 35
  };

  constructor() {}

  getDoctorProfile(): Observable<Doctor> {
    return of(this.mockDoctor);
  }

  getUpcomingAppointments(): Observable<Appointment[]> {
    return of(this.mockAppointments);
  }

  getRecentActivities(): Observable<Activity[]> {
    return of(this.mockActivities);
  }

  getDoctorStats(): Observable<Stats> {
    return of(this.mockStats);
  }

  startConsultation(appointmentId: string): Observable<void> {
    return of(void 0);
  }

  rescheduleAppointment(appointmentId: string, newDateTime: string): Observable<void> {
    return of(void 0);
  }
}