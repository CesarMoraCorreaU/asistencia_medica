import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container header-container">
        <div class="logo">
          <a routerLink="/">
            <h1>Angular<span class="highlight">Nest</span></h1>
          </a>
        </div>
        <nav class="nav">
          <ul class="nav-list">
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
            <li *ngIf="isLoggedIn"><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
            <li *ngIf="!isLoggedIn"><a routerLink="/login" routerLinkActive="active">Login</a></li>
            <li *ngIf="!isLoggedIn"><a routerLink="/register" routerLinkActive="active">Register</a></li>
            <li *ngIf="isLoggedIn">
              <button class="btn-logout" (click)="logout()">Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--surface-color);
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md) var(--spacing-sm);
    }
    
    .logo h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    
    .highlight {
      color: var(--primary-color);
    }
    
    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: var(--spacing-md);
    }
    
    .nav-list a {
      color: var(--text-secondary);
      font-weight: var(--font-weight-medium);
      transition: color 0.2s ease;
      padding: var(--spacing-xs) var(--spacing-sm);
      border-radius: var(--radius-md);
    }
    
    .nav-list a:hover, .nav-list a.active {
      color: var(--primary-color);
    }
    
    .btn-logout {
      background: none;
      border: none;
      color: var(--text-secondary);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      padding: var(--spacing-xs) var(--spacing-sm);
      transition: color 0.2s ease;
    }
    
    .btn-logout:hover {
      color: var(--error-color);
    }
    
    @media (max-width: 768px) {
      .header-container {
        flex-direction: column;
        gap: var(--spacing-sm);
      }
      
      .nav-list {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuth => {
      this.isLoggedIn = isAuth;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}