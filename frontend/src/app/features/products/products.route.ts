import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/product-list').then((m) => m.ProductList),
  },
];
