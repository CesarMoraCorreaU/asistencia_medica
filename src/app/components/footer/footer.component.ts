import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <p>&copy; {{currentYear}} AngularNest App. All rights reserved.</p>
          <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--surface-color);
      border-top: 1px solid var(--border-color);
      padding: var(--spacing-md) 0;
      margin-top: auto;
    }
    
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .footer-links {
      display: flex;
      gap: var(--spacing-md);
    }
    
    .footer-links a {
      color: var(--text-tertiary);
      font-size: 0.9rem;
    }
    
    .footer-links a:hover {
      color: var(--primary-color);
    }
    
    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        gap: var(--spacing-sm);
        text-align: center;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}