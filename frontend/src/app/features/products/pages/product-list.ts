import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../services/product.service';
import { catchError, map, of } from 'rxjs';
import { ProductTable } from '../components/product-table/product-table';

@Component({
  selector: 'app-product-list',
  imports: [ProductTable],
  template: `<div class="table-layout">
    <app-product-table [products]="products()"></app-product-table>
  </div>`,
  styles: `
    .table-layout {
      display: block;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList implements OnInit {
  protected readonly producstService = inject(ProductService);

  products = toSignal(
    this.producstService.getProducts().pipe(
      map((res) => res.data),
      catchError((error) => {
        console.error('Error cargando productos:', error);
        return of([]);
      }),
    ),
    {
      initialValue: [],
    },
  );

  ngOnInit(): void {
    console.log('res: ', this.products());
  }
}
