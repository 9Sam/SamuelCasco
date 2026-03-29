import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule],
  template: `
    <input type="text" [(ngModel)]="value" placeholder="Search..." class="search-field" />
  `,
  styles: `
    .search-field {
      width: 200px;
      padding: 8px 12px;
      font-size: 16px;
      border: 2px solid var(--color-light-grey);
      border-radius: 6px;
      box-sizing: border-box;
    }
  `,
})
export class Searchbar {
  value = model<string>();
}
