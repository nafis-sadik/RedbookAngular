import { ChangeDetectorRef, Component } from '@angular/core';
import { IProductModel } from '../Models/IProductModel';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  singleSelectGroupValue = [];

  source = [
    {
      id: 1,
      categoryId: 1,
      category: 'Motors',
      subcategory: 'EFI',
      productName: '4E-FE',
      price: 80000,
      retailPrice: 100000
    },
    {
      id: 2,
      categoryId: 1,
      category: 'Motors',
      subcategory: 'Classic',
      productName: '2JZ-GTE',
      price: 80000,
      retailPrice: 100000
    },
    {
      id: 3,
      categoryId: 1,
      category: 'Motors',
      subcategory: 'VVTi',
      productName: '2ZR-FE',
      price: 80000,
      retailPrice: 100000
    }
  ];
  // reference : https://stackblitz.com/edit/ng2-smart-table-select-title-as-value?file=src%2Fapp%2Fapp.component.ts
  // docs : https://akveo.github.io/ng2-smart-table/#/examples/using-filters
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'Product Id',
        type: 'number',
      },
      category: {
        title: 'Product Category',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 0, title: 'Oil' },
              { value: 1, title: 'Motors' },
              { value: 2, title: 'Engines' }
            ]
          }
        }
      },
      subcategory: {
        title: 'Product Subcategory',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 0, title: 'EFI' },
              { value: 1, title: 'VVTi' },
              { value: 2, title: 'Classic Engines' }
            ],
          }
        }
      },
      productName: {
        title: 'Product Name',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'number',
      },
      retailPrice: {
        title: 'MRP',
        type: 'number',
      },
    },
  };


  constructor(private changeDetector: ChangeDetectorRef) {
  }

  paginationSelectionUpdate(value: any): void {
    this.singleSelectGroupValue = value;
    this.changeDetector.markForCheck();
  }

  onDeleteConfirm(event: any): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
