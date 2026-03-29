import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Product } from '../../models/product.interface';
import { DatePipe } from '@angular/common';
import { Dropdown, Option } from '@app/shared/components/dropdown/dropdown';
import { ActionEvent, ActionsBtn } from '@app/shared/components/actions-btn/actions-btn';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-table',
  imports: [DatePipe, Dropdown, ActionsBtn],
  template: `<div class="table-container">
    <table>
      <thead>
        <tr>
          <th style="text-align: center;" scope="col">Logo</th>
          <th scope="col">Nombre del producto</th>
          <th scope="col">Descripción</th>
          <th scope="col">Fecha de liberación</th>
          <th scope="col">Fecha de reestructuración</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        @if (products().length > 0) {
          @for (product of displayedProducts(); track product.id) {
            <tr>
              <td>
                <img [src]="'svgs/logo-icon.svg'" [alt]="product.name" width="48" />
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.date_release | date: 'dd/MM/yyyy' }}</td>
              <td>{{ product.date_revision | date: 'dd/MM/yyyy' }}</td>
              <td>
                <app-actions-btn
                  (selectedAction)="onAction($event)"
                  [buttonId]="product.id!"
                ></app-actions-btn>
              </td>
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
    <div class="table-footer">
      <span>{{ displayedProducts().length }} Resultados</span>
      <app-dropdown [options]="options" (optionSelected)="onOptionSelected($event)"></app-dropdown>
    </div>
  </div>`,
  styles: `
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

    .table-container {
      overflow-x: auto;
      margin-top: 20px;
      padding: 20px;
      width: 100%;
      background: var(--main-light-color);
    }

    .table-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      margin-top: 20px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTable {
  private readonly router = inject(Router);

  selectedOption = signal<string>('5');

  options: Option[] = ['5', '10', '20'].map((option) => ({
    id: parseInt(option, 10),
    name: option,
  }));

  products = input<Product[]>([]);
  displayedProducts = computed(() => this.products().slice(0, parseInt(this.selectedOption(), 10)));

  onOptionSelected(selectedOptionId: string) {
    this.selectedOption.set(selectedOptionId);
  }

  onAction(selectedAction: ActionEvent): void {
    if (selectedAction.type === 'edit') {
      this.onEdit(selectedAction.id);
    } else if (selectedAction.type === 'delete') {
      this.onDelete(selectedAction.id);
    }
  }

  onEdit(productId: string) {
    this.router.navigate(['/products/edit'], {
      queryParams: { id: productId },
    });
  }

  onDelete(productId: string) {}
}
