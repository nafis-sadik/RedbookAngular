import { Injectable } from '@angular/core';
import { IVendorModel } from '../Models/IVendorModel';
import { IOrganizationModel } from '../Models/IOrganizationModel';
import { NbDialogService } from '@nebular/theme';
import { IProductModel } from '../Models/IProductModel';
import { ICategoryModel } from '../Models/ICategoryModel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { Observable, map, of } from 'rxjs';
import { IRouteModel } from '../Models/IRouteModel';
import { CachingService } from './caching.service';

@Injectable({
    providedIn: 'root',
})

export class DashboardService {
  baseUrl = environment.baseUrlUMS;

  selectedOutletId: number = 0;

  backendDataCategories: ICategoryModel[] = [
    {
      categoryId: 1,
      parentCategoryId: undefined,
      catagoryName: 'Oil',
      businessId: 2
    },
    {
      categoryId: 2,
      parentCategoryId: undefined,
      catagoryName: 'Motors',
      businessId: 1
    },
    {
      categoryId: 3,
      parentCategoryId: undefined,
      catagoryName: 'Engines',
      businessId: 1
    }
  ];

  backendDataSubCategories: ICategoryModel[] = [
    {
      categoryId: 3,
      parentCategoryId: 1,
      catagoryName: 'Gear Oil',
      businessId: 1
    },
    {
      categoryId: 4,
      parentCategoryId: 1,
      catagoryName: 'Engine Oil Oil',
      businessId: 2
    },
    {
      categoryId: 5,
      parentCategoryId: 3,
      catagoryName: 'EFI',
      businessId: 1
    },
    {
      categoryId: 6,
      parentCategoryId: 2,
      catagoryName: 'Deep Tubewell Motor',
      businessId: 2
    },
    {
      categoryId: 7,
      parentCategoryId: 3,
      catagoryName: 'VVTi',
      businessId: 1
    },
    {
      categoryId: 8,
      parentCategoryId: 2,
      catagoryName: 'DC Motor',
      businessId: 2
    },
    {
      categoryId: 9,
      parentCategoryId: 2,
      catagoryName: 'Stepper Motor',
      businessId: 1
    },
    {
      categoryId: 10,
      parentCategoryId: 1,
      catagoryName: 'Synthetic Oil',
      businessId: 2
    },
    {
      categoryId: 11,
      parentCategoryId: 1,
      catagoryName: 'High-Mileage Oil',
      businessId: 1
    },
    {
      categoryId: 12,
      parentCategoryId: 1,
      catagoryName: 'Synthetic Blend Oil',
      businessId: 2
    },
    {
      categoryId: 13,
      parentCategoryId: 1,
      catagoryName: 'Conventional Oil',
      businessId: 1
    },
    {
      categoryId: 14,
      parentCategoryId: 3,
      catagoryName: 'Classic Engines',
      businessId: 2
    }
  ];

  public readonly ngDialogService: NbDialogService;

  constructor(
    private http: HttpClient,
    private dialogService: NbDialogService,
    private cachingService: CachingService
  ) {
    this.ngDialogService = dialogService;
  }

  getVendors(): IVendorModel[]{
    return [
      {
        clientId: 1,
        clientName: 'Chittagong Builders',
        contactNumber: null,
        emailAddress: null
      },
      {
        clientId: 2,
        clientName: 'RFL',
        contactNumber: null,
        emailAddress: null
      }
    ];
  }

  getPagingConfig<T>(
    dialogueComponent: any,
    cardHeader: string,
    addButtonLabel: string | null = null,
    searchButtonLabel: string | null = null,
    searchFieldPlaceholder: string | null = null
  ): IPaginationModel<T> {
    return {
      tableCardHeader: cardHeader,
      tableConfig: {
        onEdit: null,
        onDelete: null,
        onView: null,
        actionColWidth: '100px',
        tableMaping: {
          "Invoice Number": "InvoiceNo",
          "Client Name": "ClientName",
          "Issue Date": "IssueDate",
          "Payment Status": "PaymentStatus",
          "Invoice Total": "InvoiceTotal",
          "Paid Amount": "PaidAmount"
        },
        sourceData: []
      },
      pagingConfig:{
        pageNumber: 1,
        totalItems: 268,
        pageLength: 5,
        onUpdate: (data: any) => {
          console.log('Page length change callback', data);
        }
      },
      searchingConfig:{
        searchString: '',
        inputFieldPlaceholder: searchFieldPlaceholder,
        buttonLabel: searchButtonLabel,
        showIcon: true,
        onSearch: (data: any) => {
          console.log('Search Callback', data)
        }
      },
      addNewElementButtonConfig: {
        buttonLabel: addButtonLabel,
        showIcon: true,
        onAdd: () => {
          if(dialogueComponent)
            this.dialogService.open(dialogueComponent);
        }
      },
    };
  }

  getProductsByBusinessId(selectedOutletId: number): IProductModel[]{
    if (selectedOutletId == 1)
        return [
          {
            productId: 4,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'VVTi',
            productName: '1NZ-FE: 1.5L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null,
            organizationId: 0
          },
          {
              productId: 5,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '2NZ-FE: 1.3L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null,
              organizationId: 0
          },
          {
              productId: 6,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '2ZZ-GE: 1.8L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null,
              organizationId: 0
          },
          {
              productId: 7,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '3S-GE: 2.0L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null,
              organizationId: 0
          },
          {
              productId: 8,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '3S-GTE: 2.0L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null,
              organizationId: 0
          },
          {
              productId: 9,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '1JZ-GTE: 2.5L Inline-6',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null,
              organizationId: 0
          },
          {
              productId: 10,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '2JZ-GTE: 3.0L',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null,
              organizationId: 0
          },
          {
              productId: 11,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '4A-GE: 1.6L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null,
              organizationId: 0
          }
        ];
      else
        return [
          {
            productId: 1,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '4E-FE 1.5L',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null,
            organizationId: 0
          },
          {
            productId: 2,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '1ZZ-FE: 1.8L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null,
            organizationId: 0
          },
          {
            productId: 3,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '2RZ-FE: 2.4L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null,
            organizationId: 0
          },
          {
            productId: 11,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '2TZ-FE: 2.4L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null,
            organizationId: 0
          },
          {
            productId: 12,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '2RZ-FE: 2.4L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null,
            organizationId: 0
          },
          {
            productId: 13,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '3RZ-FE: 2.7L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null,
            organizationId: 0
          }
        ];
  }

  getMenuOptions(){
    return this.http
      .get<IRouteModel[]>(`${this.baseUrl}/api/Route/GetMenuRoutes/${environment.appId}`)
      .pipe(map(response =>  response))
  }

  loadCategories(selectedOutletId: number): ICategoryModel[] {
    let categories: ICategoryModel[] = [];
    for (let index = 0; index < this.backendDataCategories.length; index++) {
      if(this.backendDataCategories[index].businessId == selectedOutletId)
        categories.push(this.backendDataCategories[index]);
    }
    this.selectedOutletId = selectedOutletId;
    return categories;
  }

  loadSubcategories(categoryId: number): ICategoryModel[] {
    let subcategories: ICategoryModel[] = [];
    for (let index = 0; index < this.backendDataSubCategories.length; index++) {
      if(this.backendDataSubCategories[index].parentCategoryId == categoryId)
        subcategories.push(this.backendDataSubCategories[index]);
    }

    return subcategories;
  }
}
