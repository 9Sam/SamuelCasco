import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button
      (click)="btnClick()"
      class="btn"
      [class.btn-primary]="type() === 'primary'"
      [class.btn-secondary]="type() === 'secondary'"
      [disabled]="disabled()"
    >
      {{ text() }}
    </button>
  `,
  styles: `
    .btn {
      border-style: none;
      padding: 16px 16px;
      border-radius: 3px;
      font-weight: bold;
      color: var(--color-primary);
      background-color: var(--color-secondary);
    }

    .btn-secondary {
      background-color: var(--color-light-grey);
    }

    .btn:hover {
      color: var(--color-primary);
      background-color: var(--color-secondary);
      opacity: 0.8;
      cursor: pointer;
    }

    .btn-secondary:hover {
      background-color: var(--color-light-grey);
    }

    .btn:disabled {
      color: var(--color-primary);
      background-color: var(--color-secondary);
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
})
export class Button {
  text = input.required<string>();
  type = input<'primary' | 'secondary'>('primary');
  disabled = input<boolean>(false);
  btnClicked = output<void>();

  btnClick() {
    this.btnClicked.emit();
  }
}
