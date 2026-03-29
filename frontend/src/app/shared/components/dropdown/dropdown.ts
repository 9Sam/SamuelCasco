import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

export interface Option {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dropdown',
  imports: [],
  template: `<select (change)="onItemSelected($event)">
    <label for="select">Seleccionar opción:</label>
    @for (option of options(); track option.id) {
      <option [value]="option.id">{{ option.name }}</option>
    }
  </select>`,
  styles: `
    select {
      border: 2px solid #dddddd;
      background: transparent;
      border-radius: 4px;
      padding: 6px;
      min-width: 70px;
    }

    select:hover,
    select:focus {
      background: transparent;
    }
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dropdown {
  options = input.required<Option[]>();
  optionSelected = output<string>();

  onItemSelected(event: Event) {
    event.preventDefault();
    const selectElement = event.target as HTMLSelectElement;
    const selectedOptionId = selectElement.value;
    this.optionSelected.emit(selectedOptionId);
  }
}
