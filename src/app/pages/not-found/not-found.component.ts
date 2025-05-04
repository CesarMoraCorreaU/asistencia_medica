import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found-page">
      <div class="container">
        <div class="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
          <button class="btn primary" routerLink="/">Go to Home</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-page {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--spacing-xl) 0;
    }
    
    .not-found-content {
      max-width: 500px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 6rem;
      margin: 0;
      color: var(--primary-color);
      line-height: 1;
    }
    
    h2 {
      margin-top: var(--spacing-sm);
      margin-bottom: var(--spacing-md);
      color: var(--text-primary);
    }
    
    p {
      margin-bottom: var(--spacing-lg);
      color: var(--text-secondary);
    }
    
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing-sm) var(--spacing-lg);
      border-radius: var(--radius-md);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.1s ease;
    }
    
    .btn.primary {
      background-color: var(--primary-color);
      color: white;
    }
    
    .btn.primary:hover {
      background-color: var(--primary-color-dark);
    }
  `]
})
export class NotFoundComponent {}