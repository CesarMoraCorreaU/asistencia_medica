import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';  // Aquí importas throwError
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Mock API URL - will be replaced with actual backend URL
  private apiUrl = environment.apiUrl;  
  
  // Mock data for development
  private mockTasks = [
    { id: '1', title: 'Finish project documentation', completed: false, dueDate: 'Apr 15, 2025' },
    { id: '2', title: 'Deploy application to production', completed: true, dueDate: 'Apr 10, 2025' },
    { id: '3', title: 'Review pull requests', completed: false, dueDate: 'Apr 20, 2025' },
    { id: '4', title: 'Update dependencies', completed: false, dueDate: 'Apr 25, 2025' }
  ];
  
private mockActivities = [
    { id: '1', type: 'created', message: 'Created a new task: Finish project documentation', time: '2 hours ago' },
    { id: '2', type: 'completed', message: 'Completed task: Deploy application to production', time: '1 day ago' },
    { id: '3', type: 'updated', message: 'Updated task deadline: Review pull requests', time: '3 days ago' }
  ];
  
  private mockStats = {
    projects: 5,
    tasks: 12,
    completed: 7
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  // User Profile
  getUserProfile(): Observable<any> {
    return of(this.authService.currentUserValue);
  }

  // Tasks
  getTasks(): Observable<any[]> {
    return of(this.mockTasks);
  }

  getTask(id: string): Observable<any> {
    const task = this.mockTasks.find(t => t.id === id);
    return of(task);
  }

  createTask(task: any): Observable<any> {
    const newTask = { 
      id: (this.mockTasks.length + 1).toString(), 
      ...task 
    };
    this.mockTasks.push(newTask);
    
    // Add activity
    this.mockActivities.unshift({
      id: (this.mockActivities.length + 1).toString(),
      type: 'created',
      message: `Created a new task: ${task.title}`,
      time: 'Just now'
    });
    
    // Update stats
    this.mockStats.tasks += 1;
    
    return of(newTask);
  }

  updateTask(id: string, changes: any): Observable<any> {
    const index = this.mockTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTasks[index] = { ...this.mockTasks[index], ...changes };
      
      // Add activity if task was completed
      if (changes.completed === true) {
        this.mockActivities.unshift({
          id: (this.mockActivities.length + 1).toString(),
          type: 'completed',
          message: `Completed task: ${this.mockTasks[index].title}`,
          time: 'Just now'
        });
        
        // Update stats
        this.mockStats.completed += 1;
      } else if (changes.completed === false) {
        // Update stats if task was uncompleted
        this.mockStats.completed -= 1;
      }
      
      return of(this.mockTasks[index]);
    }
    return of(null);
  }

  deleteTask(id: string): Observable<any> {
    const index = this.mockTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      const deleted = this.mockTasks[index];
      this.mockTasks.splice(index, 1);
      
      // Update stats
      this.mockStats.tasks -= 1;
      if (deleted.completed) {
        this.mockStats.completed -= 1;
      }
      
      return of({ success: true });
    }
    return of({ success: false });
  }

  // Activities
  getActivities(): Observable<any[]> {
    return of(this.mockActivities);
  }

  // Stats
  getStats(): Observable<any> {
    return of(this.mockStats);
  }

  // Helper methods
  private getHttpOptions() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        })
      };
    }
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  private handleError(error: any) {
    console.error('API error:', error);
    return throwError(() => error);  // Aquí ya tienes la importación de throwError
  }
}