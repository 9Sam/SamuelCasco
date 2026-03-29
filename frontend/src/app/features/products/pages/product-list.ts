import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../services/product.service';
import { catchError, map, of, startWith } from 'rxjs';
import { ProductTable } from '../components/product-table/product-table';
import { Skeleton } from '@app/shared/components/skeleton/skeleton';
import { Searchbar } from '@app/shared/components/searchbar/searchbar';

const products = [
  {
    id: 'trj-001',
    name: 'Tarjeta de Crédito Oro',
    description:
      'Tarjeta con beneficios exclusivos y tasa preferencial para compras internacionales.',
    logo: 'images/logo-default.png',
    date_release: new Date('2025-01-01'),
    date_revision: new Date('2026-01-01'),
  },
  {
    id: 'trj-002',
    name: 'Cuenta de Ahorros Joven',
    description: 'Cuenta sin comisiones de mantenimiento para menores de 25 años con banca móvil.',
    logo: 'images/logo-default.png',
    date_release: new Date('2025-02-15'),
    date_revision: new Date('2026-02-15'),
  },
  {
    id: 'trj-003',
    name: 'Préstamo Hipotecario Vivienda',
    description: 'Financiamiento de hasta el 90% para tu primera casa con plazos de hasta 20 años.',
    logo: 'images/logo-default.png',
    date_release: new Date('2024-11-20'),
    date_revision: new Date('2025-11-20'),
  },
  {
    id: 'trj-004',
    name: 'Seguro de Vida Integral',
    description: 'Protección completa para tu familia con cobertura médica y asistencia funeraria.',
    logo: 'images/logo-default.png',
    date_release: new Date('2025-03-10'),
    date_revision: new Date('2026-03-10'),
  },
  {
    id: 'trj-005',
    name: 'Inversión Plazo Fijo',
    description: 'Haz crecer tu dinero con una de las mejores tasas de interés del mercado local.',
    logo: 'images/logo-default.png',
    date_release: new Date('2025-01-20'),
    date_revision: new Date('2026-01-20'),
  },
  {
    id: 'trj-006',
    name: 'Tarjeta Visa Infinite',
    description: 'Acceso a salas VIP en aeropuertos y seguros de viaje de cobertura global.',
    logo: 'images/logo-default.png',
    date_release: new Date('2024-12-05'),
    date_revision: new Date('2025-12-05'),
  },
  {
    id: 'trj-007',
    name: 'Crédito Vehicular',
    description: 'Financia el auto de tus sueños con aprobación inmediata y tasas competitivas.',
    logo: 'images/logo-default.png',
    date_release: new Date('2025-04-01'),
    date_revision: new Date('2026-04-01'),
  },
  {
    id: 'trj-008',
    name: 'Microcrédito Emprendedor',
    description: 'Impulsa tu pequeño negocio con asesoría personalizada y pagos flexibles.',
    logo: 'images/logo-default.png',
    date_release: new Date('2025-02-28'),
    date_revision: new Date('2026-02-28'),
  },
  {
    id: 'trj-009',
    name: 'Cuenta Corriente Premium',
    description: 'Gestión eficiente de tus fondos con chequera y sobregiros automáticos aprobados.',
    logo: 'images/logo-default.png',
    date_release: new Date('2025-05-12'),
    date_revision: new Date('2026-05-12'),
  },
  {
    id: 'trj-010',
    name: 'Bono de Estabilidad',
    description:
      'Producto de ahorro programado para metas a largo plazo con bonificaciones anuales.',
    logo: 'images/logo-default.png',
    date_release: new Date('2024-10-15'),
    date_revision: new Date('2025-10-15'),
  },
  {
    id: 'trj-011',
    name: 'Tarjeta Virtual Prepago',
    description:
      'Realiza tus compras online de forma segura sin exponer tus datos bancarios principales.',
    logo: 'images/logo-default.png',
    date_release: new Date('2025-06-20'),
    date_revision: new Date('2026-06-20'),
  },
];

@Component({
  selector: 'app-product-list',
  imports: [ProductTable, Skeleton, Searchbar],
  template: ` <app-searchbar [(value)]="searchTerm"></app-searchbar>
    <div class="table-layout">
      @if (isLoading()) {
        <div>
          <app-skeleton width="100%" height="400px"></app-skeleton>
        </div>
      } @else {
        <app-product-table [products]="filteredProducts()"></app-product-table>
      }
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
export class ProductList {
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
}
