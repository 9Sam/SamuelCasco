import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';
import { catchError, map, of, startWith } from 'rxjs';
import { ProductTable } from '../../components/product-table/product-table';
import { Skeleton } from '@app/shared/components/skeleton/skeleton';
import { Searchbar } from '@app/shared/components/searchbar/searchbar';
import { Button } from '@app/shared/components/button/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [ProductTable, Skeleton, Searchbar, Button],
  template: `<div class="product-list">
    <div class="table-header">
      <app-searchbar [(value)]="searchTerm"></app-searchbar>
      <app-button text="Agregar" (btnClicked)="addProduct()"></app-button>
    </div>
    <div class="table-layout">
      @if (isLoading()) {
        <div>
          <app-skeleton width="100%" height="400px"></app-skeleton>
        </div>
      } @else {
        <app-product-table [products]="filteredProducts()"></app-product-table>
      }
    </div>
  </div> `,
  styles: `
    .product-list {
      margin: 0 auto;
      padding: 20px;
      max-width: 1200px;
      min-height: 100vh;
      background-color: var(--main-bg-color);
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .table-layout {
      display: block;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .table-header {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  protected readonly router = inject(Router);
  protected readonly producstService = inject(ProductService);
  searchTerm = signal('');

  private productsState = toSignal(
    this.producstService.getProducts().pipe(
      map((res) => ({ loading: false, data: res.data, error: null })),
      startWith({ loading: true, data: [], error: null }),
      catchError((error) => of({ loading: false, data: [], error })),
    ),
    { initialValue: { loading: true, data: [], error: null } },
  );

  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.products().filter((p) => p.name.toLowerCase().includes(term));
  });

  products = computed(() => this.productsState().data);
  isLoading = computed(() => this.productsState().loading);

  addProduct() {
    this.router.navigateByUrl('/products/add');
  }
}
