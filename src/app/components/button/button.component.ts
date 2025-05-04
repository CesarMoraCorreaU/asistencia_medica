import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button 
      [type]="type" 
      [disabled]="loading || disabled"
      [ngClass]="['btn', variant, size, { 'btn-loading': loading }]"
      (click)="onClick.emit($event)"
    >
      <span class="loader" *ngIf="loading"></span>
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: var(--radius-md);
      font-weight: var(--font-weight-medium);
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.1s ease;
    }
    
    .btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .btn:active:not(:disabled) {
      transform: scale(0.98);
    }
    
    /* Variants */
    .primary {
      background-color: var(--primary-color);
      color: white;
    }
    
    .primary:hover:not(:disabled) {
      background-color: var(--primary-color-dark);
    }
    
    .secondary {
      background-color: var(--secondary-color);
      color: white;
    }
    
    .secondary:hover:not(:disabled) {
      background-color: var(--secondary-color-dark);
    }
    
    .accent {
      background-color: var(--accent-color);
      color: white;
    }
    
    .accent:hover:not(:disabled) {
      background-color: var(--accent-color-dark);
    }
    
    .outline {
      background-color: transparent;
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
    }
    
    .outline:hover:not(:disabled) {
      background-color: rgba(10, 132, 255, 0.1);
    }
    
    .text {
      background-color: transparent;
      color: var(--primary-color);
    }
    
    .text:hover:not(:disabled) {
      background-color: rgba(10, 132, 255, 0.1);
    }
    
    /* Sizes */
    .sm {
      padding: var(--spacing-xs) var(--spacing-sm);
      font-size: 0.875rem;
    }
    
    .md {
      padding: var(--spacing-sm) var(--spacing-md);
      font-size: 1rem;
    }
    
    .lg {
      padding: var(--spacing-md) var(--spacing-lg);
      font-size: 1.125rem;
    }
    
    /* Loading state */
    .btn-loading {
      position: relative;
    }
    
    .btn-loading > :not(.loader) {
      visibility: hidden;
    }
    
    .loader {
      position: absolute;
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'accent' | 'outline' | 'text' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() loading = false;
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<MouseEvent>();
}