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
      background-color: #ffffff;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  icon = 'images/banco-icon.png';
}
