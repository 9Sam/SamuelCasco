import { Component, ElementRef, HostListener, inject, input, output, signal } from '@angular/core';

type ActionType = 'edit' | 'delete' | null;
export interface ActionEvent {
  type: ActionType;
  id: string;
}

@Component({
  selector: 'app-actions-btn',
  standalone: true,
  template: `
    <div class="actions-container">
      <button class="trigger-btn" (click)="toggleDropdown($event)" aria-label="Acciones">
        <img src="svgs/three-dots.svg" alt="" width="24" />
      </button>

      @if (isDropdownOpen()) {
        <div class="dropdown-menu">
          <button class="dropdown-item" (click)="handleAction('edit')">Editar</button>
          <button class="dropdown-item delete" (click)="handleAction('delete')">Eliminar</button>
        </div>
      }
    </div>
  `,
  styles: `
    .actions-container {
      position: relative;
      display: inline-block;
    }

    .trigger-btn {
      border: none;
      background: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 4px;
      transition: background 0.2s;
    }

    .trigger-btn:hover {
      background-color: #f3f4f6;
    }

    .dropdown-menu {
      position: absolute;
      right: 0;
      top: 100%;
      z-index: 1000;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      min-width: 120px;
      overflow: hidden;
      animation: fadeIn 0.1s ease-out;
    }

    .dropdown-item {
      display: block;
      width: 100%;
      padding: 18px 16px;
      text-align: left;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 14px;
      color: #374151;
    }

    .dropdown-item:hover {
      background-color: #f9fafb;
    }
    .dropdown-item.delete {
      color: #ef4444;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
})
export class ActionsBtn {
  private readonly el = inject(ElementRef);

  buttonId = input.required<string>();

  isDropdownOpen = signal(false);
  selectedAction = output<ActionEvent>();

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isDropdownOpen.set(false);
    }
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen.update((v) => !v);
  }

  handleAction(type: ActionType) {
    this.selectedAction.emit({ type, id: this.buttonId() });
  }
}
