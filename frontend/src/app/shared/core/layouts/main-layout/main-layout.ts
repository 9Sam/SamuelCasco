import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Navbar],
  template: `
    <div class="main-container">
      <header>
        <app-navbar />
      </header>

      <main class="main-content">
        <router-outlet />
      </main>

      <footer></footer>
    </div>
  `,
  styles: `
    .main-container {
      display: flex;
      flex-direction: column;
      background: var(--main-bg-color);
      min-height: 100vh;
    }

    .main-content {
      padding: 20px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {}
