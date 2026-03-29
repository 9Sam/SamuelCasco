import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  template: ` <div class="navbar">
    <img [src]="icon" />
  </div>`,
  styles: `
    .navbar {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      margin-bottom: 30px;
      background-color: var(--main-light-color);
      box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  icon = 'images/banco-icon.png';
}
