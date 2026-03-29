import { Routes } from '@angular/router';
import { MainLayout } from './shared/core/layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    loadChildren: () => import('./features/products/products.route').then((m) => m.productRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
