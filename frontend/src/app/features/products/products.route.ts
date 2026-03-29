import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/product-list/product-list').then((m) => m.ProductList),
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/product/product').then((m) => m.Product),
  },
  {
    path: 'edit',
    loadComponent: () => import('./pages/product/product').then((m) => m.Product),
  },
];
