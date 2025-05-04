import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="home-page">
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="slide-in">Angular + Nest.js Starter</h1>
            <p class="hero-subtitle slide-in">A modern, full-stack application template with beautiful design</p>
            <div class="hero-buttons slide-in">
              <button class="btn primary" routerLink="/dashboard">Get Started</button>
              <button class="btn outline" routerLink="/login">Sign In</button>
            </div>
          </div>
        </div>
      </section>

      <section class="features">
        <div class="container">
          <h2 class="section-title">Key Features</h2>
          <div class="row">
            <div class="col">
              <app-card title="Angular Frontend" [hover]="true">
                <p>Modern UI components with reactive forms and responsive design</p>
              </app-card>
            </div>
            <div class="col">
              <app-card title="Nest.js Backend" [hover]="true">
                <p>Structured backend with dependency injection and modular architecture</p>
              </app-card>
            </div>
            <div class="col">
              <app-card title="Authentication" [hover]="true">
                <p>Secure JWT-based authentication with role-based access control</p>
              </app-card>
            </div>
          </div>
        </div>
      </section>

      <section class="cta">
        <div class="container">
          <div class="cta-content">
            <h2>Ready to Start Building?</h2>
            <p>Get access to all features and start creating your next big project</p>
            <button class="btn primary lg" routerLink="/register">Sign Up Now</button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero {
      padding: var(--spacing-xxl) 0;
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%);
      color: white;
      text-align: center;
    }
    
    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .hero h1 {
      font-size: 3rem;
      margin-bottom: var(--spacing-md);
      animation-delay: 0.1s;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: var(--spacing-lg);
      opacity: 0.9;
      animation-delay: 0.2s;
    }
    
    .hero-buttons {
      display: flex;
      gap: var(--spacing-md);
      justify-content: center;
      animation-delay: 0.3s;
    }
    
    .features {
      padding: var(--spacing-xxl) 0;
      background-color: var(--background-color);
    }
    
    .section-title {
      text-align: center;
      margin-bottom: var(--spacing-xl);
    }
    
    .cta {
      padding: var(--spacing-xxl) 0;
      background-color: var(--surface-color);
      border-top: 1px solid var(--border-color);
    }
    
    .cta-content {
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .cta h2 {
      margin-bottom: var(--spacing-md);
    }
    
    .cta p {
      margin-bottom: var(--spacing-lg);
      color: var(--text-secondary);
    }
    
    /* Button styles for home page */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: var(--radius-md);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.1s ease;
      padding: var(--spacing-sm) var(--spacing-lg);
    }
    
    .btn.primary {
      background-color: var(--primary-color);
      color: white;
    }
    
    .btn.primary:hover {
      background-color: var(--primary-color-dark);
    }
    
    .btn.outline {
      background-color: transparent;
      color: white;
      border: 1px solid white;
    }
    
    .btn.outline:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    .cta .btn.primary {
      background-color: var(--primary-color);
      color: white;
      padding: var(--spacing-md) var(--spacing-xl);
    }
    
    .btn.lg {
      padding: var(--spacing-md) var(--spacing-xl);
      font-size: 1.125rem;
    }
    
    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2.5rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .hero-buttons .btn {
        width: 100%;
        max-width: 250px;
      }
    }
  `]
})
export class HomeComponent {
  // ... existing component code
}