import { Injectable } from '@angular/core';
import { IVendorModel } from './Models/IVendorModel';
import { IBusinessModel } from './Models/IBusinessModel';
import { NbDialogService } from '@nebular/theme';
import { IProductModel } from './Models/IProductModel';
import { ICategoryModel } from './Models/ICategoryModel';
import { IRoutePermissionModel } from './Models/IRoutePermissionModel';

@Injectable({
    providedIn: 'root',
})

export class DashboardService {
  /**
   * Primary key of selected outlet
   * Needs to be passed to dialogue components
   */
  selectedOutletId: number = 0;

  backendDataCategories: ICategoryModel[] = [
    {
      categoryId: 1,
      parentCategoryId: undefined,
      title: 'Oil',
      businessId: 2
    },
    {
      categoryId: 2,
      parentCategoryId: undefined,
      title: 'Motors',
      businessId: 1
    },
    {
      categoryId: 3,
      parentCategoryId: undefined,
      title: 'Engines',
      businessId: 1
    }
  ];

  backendDataSubCategories: ICategoryModel[] = [
    {
      categoryId: 3,
      parentCategoryId: 1,
      title: 'Gear Oil',
      businessId: 1
    },
    {
      categoryId: 4,
      parentCategoryId: 1,
      title: 'Engine Oil Oil',
      businessId: 2
    },
    {
      categoryId: 5,
      parentCategoryId: 3,
      title: 'EFI',
      businessId: 1
    },
    {
      categoryId: 6,
      parentCategoryId: 2,
      title: 'Deep Tubewell Motor',
      businessId: 2
    },
    {
      categoryId: 7,
      parentCategoryId: 3,
      title: 'VVTi',
      businessId: 1
    },
    {
      categoryId: 8,
      parentCategoryId: 2,
      title: 'DC Motor',
      businessId: 2
    },
    {
      categoryId: 9,
      parentCategoryId: 2,
      title: 'Stepper Motor',
      businessId: 1
    },
    {
      categoryId: 10,
      parentCategoryId: 1,
      title: 'Synthetic Oil',
      businessId: 2
    },
    {
      categoryId: 11,
      parentCategoryId: 1,
      title: 'High-Mileage Oil',
      businessId: 1
    },
    {
      categoryId: 12,
      parentCategoryId: 1,
      title: 'Synthetic Blend Oil',
      businessId: 2
    },
    {
      categoryId: 13,
      parentCategoryId: 1,
      title: 'Conventional Oil',
      businessId: 1
    },
    {
      categoryId: 14,
      parentCategoryId: 3,
      title: 'Classic Engines',
      businessId: 2
    }
  ];

  public readonly ngDialogService: NbDialogService;

  constructor(private dialogService: NbDialogService) {
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

  getOutlets(): IBusinessModel[]{
    return [
      {
        businessId: 1,
        ownerId: 'GUID',
        title: 'Krishi Ghor',
        address: [ 'Grand Hotel Mor, Shallow Market, Near of Sub-Post Office, Shapla Road, Station Road, Rangpur 5400, Bangladesh Rangpur City, Rangpur Division, 5400' ]
      },
      {
        businessId: 2,
        ownerId: 'GUID',
        title: 'FM Sky Vision',
        address: [ 'Grand Hotel Mor, Shallow Market, Near of Sub-Post Office, Shapla Road, Station Road, Rangpur 5400, Bangladesh Rangpur City, Rangpur Division, 5400' ]
      }
    ];
  }

  getPagingConfig(DialogueComponent: any, TableCardHeader: string, AddButtonLabel: string='Add', SearchButtonLabel: string='Search', SearchFieldPlaceholder: string='Search') {
    return {
      tableCardHeader: TableCardHeader,
      sourceData: [],
      allowAdd: true,
      tableConfig: {
        onEdit: null,
        onDelete: null,
        isEditableTable: false,
        tableMaping: {
          "Invoice Number": "InvoiceNo",
          "Client Name": "ClientName",
          "Issue Date": "IssueDate",
          "Payment Status": "PaymentStatus",
          "Invoice Total": "InvoiceTotal",
          "Paid Amount": "PaidAmount"
        },
      },
      pagingConfig:{
        pageNumber: 1,
        totalItems: 268,
        pageLength: 5,
        pageLengthOptions: [ 5, 10, 100 ],
        onChange: () => {
          console.log('Page length change callback');
        }
      },
      searchingConfig:{
        searchString: '',
        inputFieldPlaceholder: SearchFieldPlaceholder,
        buttonLabel: SearchButtonLabel,
        showIcon: true,
        onClick: () => {
          console.log('Search Callback')
        }
      },
      addNewElementButtonConfig: {
        buttonLabel: AddButtonLabel,
        showIcon: true,
        onClick: () => {
          if(DialogueComponent)
            this.dialogService.open(DialogueComponent);
        }
      },
    };
  }

  getProductsByBusinessId(selectedOutletId: number): IProductModel[]{
    if (selectedOutletId == 1)
        return [
          {
            id: 4,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'VVTi',
            productName: '1NZ-FE: 1.5L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null
          },
          {
              id: 5,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '2NZ-FE: 1.3L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null
          },
          {
              id: 6,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '2ZZ-GE: 1.8L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null
          },
          {
              id: 7,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '3S-GE: 2.0L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null
          },
          {
              id: 8,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '3S-GTE: 2.0L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null
          },
          {
              id: 9,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '1JZ-GTE: 2.5L Inline-6',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null
          },
          {
              id: 10,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '2JZ-GTE: 3.0L',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null
          },
          {
              id: 11,
              categoryId: 1,
              categoryName: 'Motors',
              subcategoryId: 2,
              subcategoryName: 'VVTi',
              productName: '4A-GE: 1.6L Inline-4',
              purchasePrice: 80000,
              retailPrice: 100000,
              quantity: null
          }
        ];
      else
        return [
          {
            id: 1,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '4E-FE 1.5L',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null
          },
          {
            id: 2,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '1ZZ-FE: 1.8L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null
          },
          {
            id: 3,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '2RZ-FE: 2.4L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null
          },
          {
            id: 11,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '2TZ-FE: 2.4L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null
          },
          {
            id: 12,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '2RZ-FE: 2.4L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null
          },
          {
            id: 13,
            categoryId: 1,
            categoryName: 'Motors',
            subcategoryId: 2,
            subcategoryName: 'EFI',
            productName: '3RZ-FE: 2.7L Inline-4',
            purchasePrice: 80000,
            retailPrice: 100000,
            quantity: null
          }
        ];
  }

  getMenuOptionsByUserId(userId: string){
    return [
      {
        title: 'Dashboards',
        icon: 'keypad',
        link: '/dashboard/home'
      },
      {
        title: 'Business Operations',
        icon: 'layers',
        expanded: false,
        children:[
          {
            title: 'Invoice/Purchase',
            icon: 'shopping-bag',
            link: '/dashboard/purchase'
          },
          {
            title: 'Sales',
            icon: 'shopping-cart',
            link: '/dashboard/sales'
          }
        ]
      },
      {
        title: 'CRM',
        icon: 'people',
        expanded: false,
        children: [
          {
            title: 'Messenger',
            icon: 'message-circle'
          },
          {
            title: 'Whatsapp',
            icon: 'email'
          },
          {
            title: 'Customers',
            icon: 'person'
          }
        ]
      },
      {
        title: 'Settings',
        icon: 'settings',
        expanded: false,
        children: [
          {
            title: 'Product Management',
            icon: 'cube',
            children: [
              {
                title: 'Categories',
                icon: 'list',
                link: '/dashboard/category'
              },
              {
                title: 'Product List',
                icon: 'list',
                link: '/dashboard/products'
              }
            ]
          },
          {
            title: 'System Settings',
            icon: 'briefcase',
            link: '/dashboard/settings'
          }
        ]
      }
    ];
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

  getRoutePermissions(roleId: number): IRoutePermissionModel[]{
    if(roleId == 5)
      return [
        {
          RouteId: 1,
          RouteName: 'Category',
          IsPermitted: false
        },
        {
          RouteId: 2,
          RouteName: 'Products',
          IsPermitted: false
        },
        {
          RouteId: 3,
          RouteName: 'Purchase',
          IsPermitted: false
        },
        {
          RouteId: 4,
          RouteName: 'Sales',
          IsPermitted: false
        },
        {
          RouteId: 5,
          RouteName: 'UMS',
          IsPermitted: true
        },
        {
          RouteId: 6,
          RouteName: 'Settings',
          IsPermitted: true
        }
      ]
    else
      return [
        {
          RouteId: 1,
          RouteName: 'Category',
          IsPermitted: true
        },
        {
          RouteId: 2,
          RouteName: 'Products',
          IsPermitted: true
        },
        {
          RouteId: 3,
          RouteName: 'Purchase',
          IsPermitted: true
        },
        {
          RouteId: 4,
          RouteName: 'Sales',
          IsPermitted: true
        },
        {
          RouteId: 5,
          RouteName: 'UMS',
          IsPermitted: false
        },
        {
          RouteId: 6,
          RouteName: 'Settings',
          IsPermitted: false
        }
      ]
  }
}
