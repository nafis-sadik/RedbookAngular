import { ChangeDetectorRef, Component } from '@angular/core';
import { IProductModel } from '../Models/IProductModel';
import { NbToastrService } from '@nebular/theme';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  singleSelectGroupValue = [];

  source: IProductModel[] = [
    {
      id: 1,
      categoryId: 1,
      categoryName: 'Motors',
      subcategoryId: 2,
      subcategoryName: 'EFI',
      productName: '4E-FE',
      purchasePrice: 80000,
      retailPrice: 100000
    },
    {
      id: 2,
      categoryId: 1,
      categoryName: 'Motors',
      subcategoryId: 2,
      subcategoryName: 'Classic',
      productName: '2JZ-GTE',
      purchasePrice: 80000,
      retailPrice: 100000
    },
    {
      id: 3,
      categoryId: 1,
      categoryName: 'Motors',
      subcategoryId: 2,
      subcategoryName: 'VVTi',
      productName: '2ZR-FE',
      purchasePrice: 80000,
      retailPrice: 100000
    }
  ];

  cardHeader: string = "Product Management";

  // reference : https://stackblitz.com/edit/ng2-smart-table-select-title-as-value?file=src%2Fapp%2Fapp.component.ts
  // docs : https://akveo.github.io/ng2-smart-table/#/examples/using-filters
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
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
              { id: 0, value: 'Oil', title: 'Oil' },
              { id: 1, value: 'Motors', title: 'Motors' },
              { id: 2, value: 'Engines', title: 'Engines' }
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
              { id: 0, value: 'EFI', title: 'EFI' },
              { id: 1, value: 'VVTi', title: 'VVTi' },
              { id: 2, value: 'Classic Engines', title: 'Classic Engines' }
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

  pagedProductModel: IPaginationModel<IProductModel>;

  constructor(private changeDetector: ChangeDetectorRef, private toastrService: NbToastrService) {
    this.pagedProductModel = {
      tableCardHeader: "Product Management",
      allowDelete: true,
      allowEdit: true,
      isEditableTable: false,
      tableMaping: {
        "Product Id": "id",
        "Product Category": "categoryName",
        "Product Subcategory": "subcategoryName",
        "Product Name": "productName",
        "Price": "purchasePrice",
        "MRP": "retailPrice"
      },
      itemsPerPage: 6,
      pageNumber: 2,
      totalItems: 268,
      sourceData: this.source
    };
  }

  paginationSelectionUpdate(value: any): void {
    this.singleSelectGroupValue = value;
    console.log(this.singleSelectGroupValue);
    this.changeDetector.markForCheck();
  }

  onCreateConfirm(event: any): void {
    if (window.confirm('Are you sure you want to create?')) {
      this.toastrService.success('Product added successfully', 'Success');
      event.confirm.resolve();
    } else {
      this.toastrService.danger('Failed to add product', 'Error');
      event.confirm.reject();
    }
  }

  onSaveConfirm(event: any): void {
    if (window.confirm('Are you sure you want to save?')) {
      this.toastrService.success('Product details updated successfully', 'Success');
      event.confirm.resolve(event.newData);
      console.log(event.newData); //this contains the new edited data
    }
      // your post request goes here
      // example
        // const req = http.post('/api/items/add', body);
        // 0 requests made - .subscribe() not called.
        // req.subscribe(); // 1 request made.
  }

  onDeleteConfirm(event: any): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.toastrService.success('Product added successfully', 'Success');
      event.confirm.resolve();
    } else {
      this.toastrService.danger('Failed to delete product', 'Error');
      event.confirm.reject();
    }
  }
}
