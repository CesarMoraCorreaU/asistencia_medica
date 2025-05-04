import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthcareService {
  private apiUrl = 'api/healthcare'; // Adjust this to match your API endpoint

  constructor(private http: HttpClient) {}

  getDoctorProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctor/profile`);
  }

  getUpcomingAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appointments/upcoming`);
  }

  getRecentActivities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/activities/recent`);
  }

  getDoctorStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctor/stats`);
  }

  startConsultation(appointmentId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/consultation/start/${appointmentId}`, {});
  }

  rescheduleAppointment(appointmentId: string, newDateTime: Date): Observable<any> {
    return this.http.put(`${this.apiUrl}/appointments/${appointmentId}/reschedule`, {
      dateTime: newDateTime
    });
  }
}