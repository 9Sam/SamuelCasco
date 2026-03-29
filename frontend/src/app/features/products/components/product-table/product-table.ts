import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../../models/product.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-table',
  imports: [DatePipe],
  template: `<div class="table-container">
    <table>
      <thead>
        <tr>
          <th style="text-align: center;" scope="col">Logo</th>
          <th scope="col">Nombre del producto</th>
          <th scope="col">Descripción</th>
          <th scope="col">Fecha de liberación</th>
          <th scope="col">Fecha de reestructuración</th>
          <!-- <th scope="col">Acciones</th> -->
        </tr>
      </thead>
      <tbody>
        @if (products().length > 0) {
          @for (product of products(); track product.id) {
            <tr>
              <td>
                <img [src]="product.logo" [alt]="product.name" width="48" />
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.date_release | date: 'dd/MM/yyyy' }}</td>
              <td>{{ product.date_revision | date: 'dd/MM/yyyy' }}</td>
              <!-- <td>
                <button (click)="onEdit(product)">Editar</button>
                <button (click)="onDelete(product.id)">Borrar</button>
              </td> -->
            </tr>
          }
        } @else {
          <tr>
            <td colspan="6" style="text-align: center; padding: 20px;">
              <span>No hay productos disponibles.</span>
            </td>
          </tr>
        }
      </tbody>
    </table>
  </div>`,
  styles: `
    .table-container {
      overflow-x: auto;
      margin-top: 20px;
      padding: 20px;
      width: 100%;
      background: var(--main-light-color);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-family: sans-serif;
      background: white;
      min-width: 400px;
    }

    caption {
      padding: 10px;
      font-weight: bold;
      text-align: left;
    }

    th {
      background-color: #f8f9fa;
      color: #333;
      font-weight: 600;
      text-align: left;
      padding: 20px 15px;
      border-bottom: 3px solid #eee;
    }

    td {
      padding: 12px 15px;
      border-bottom: 3px solid #eee;
      color: #555;
    }

    tbody tr:nth-child(even) {
      background-color: #fcfcfc;
    }

    tbody tr:hover {
      background-color: #f1f1f1;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTable {
  userEdited = output<Product>();
  userDeleted = output<string>();

  products = input<Product[]>([]);
  // onEdit(product: Product): void {
  //   this.userEdited.emit(product);
  // }

  // onDelete(id: string): void {
  //   this.userDeleted.emit(id);
  // }
}
