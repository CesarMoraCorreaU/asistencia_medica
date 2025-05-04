import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  
  // Mock API URL - will be replaced with actual backend URL
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    // This is a mock implementation for development
    // In a real app, replace with actual API call
    return of({
      id: '1',
      name: 'John Doe',
      email: email,
      token: 'fake-jwt-token'
    }).pipe(
      tap(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
    
    // Real implementation would be:
    // return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
    //   .pipe(
    //     tap(user => {
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //       return user;
    //     })
    //   );
  }

  register(name: string, email: string, password: string): Observable<any> {
    // This is a mock implementation for development
    // In a real app, replace with actual API call
    return of({ success: true }).pipe(
      tap(() => {
        return { success: true };
      })
    );
    
    // Real implementation would be:
    // return this.http.post<any>(`${this.apiUrl}/auth/register`, { name, email, password });
  }

  logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser.pipe(
      map(user => !!user)
    );
  }

  private getUserFromStorage(): any {
    try {
      return JSON.parse(localStorage.getItem('currentUser') || 'null');
    } catch (e) {
      return null;
    }
  }
}