import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: ``,
  styles: [
    `
      :host {
        display: block;
        width: var(--width, 100%);
        height: var(--height, 20px);
        border-radius: var(--radius, 4px);
        background-color: #d1d5db;
        background-image: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0,
          rgba(255, 255, 255, 0.3) 50%,
          rgba(255, 255, 255, 0) 100%
        );
        background-repeat: no-repeat;
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite linear;
      }

      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `,
  ],
  host: {
    '[style.--width]': 'width()',
    '[style.--height]': 'height()',
    '[style.--radius]': 'radius()',
  },
})
export class Skeleton {
  width = input('100%');
  height = input('20px');
  radius = input('4px');
}
