import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [class.hover-enabled]="hover">
      <div class="card-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="card-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: var(--surface-color);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      padding: var(--spacing-md);
      margin-bottom: var(--spacing-md);
    }
    
    .hover-enabled:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
      transition: all 0.2s ease;
    }
    
    .card-header h3 {
      margin: 0;
      margin-bottom: var(--spacing-md);
      color: var(--text-primary);
    }
  `]
})
export class CardComponent {
  @Input() title: string = '';
  @Input() hover: boolean = false;
}