import { Component } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { IBusinessModel } from '../Models/IBusinessModel';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ICategoryModel } from '../Models/ICategoryModel';
import { RemoveCategoryComponent } from './remove-category/remove-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
  
export class CategoryComponent {
  backendDataCategories: ICategoryModel[] = [
    {
      categoryId: 1,
      parentCategoryId: undefined,
      title: 'Oil'
    },
    {
      categoryId: 2,
      parentCategoryId: undefined,
      title: 'Motors'
    },
    {
      categoryId: 3,
      parentCategoryId: undefined,
      title: 'Engines'
    }
  ];

  backendDataSubCategories: ICategoryModel[] = [
    {
      categoryId: 3,
      parentCategoryId: 1,
      title: 'Gear Oil'
    },
    {
      categoryId: 4,
      parentCategoryId: 1,
      title: 'Engine Oil Oil'
    },
    {
      categoryId: 5,
      parentCategoryId: 3,
      title: 'EFI'
    },
    {
      categoryId: 6,
      parentCategoryId: 2,
      title: 'Deep Tubewell Motor'
    },
    {
      categoryId: 7,
      parentCategoryId: 3,
      title: 'VVTi'
    },
    {
      categoryId: 8,
      parentCategoryId: 2,
      title: 'DC Motor'
    },
    {
      categoryId: 9,
      parentCategoryId: 2,
      title: 'Stepper Motor'
    },
    {
      categoryId: 10,
      parentCategoryId: 1,
      title: 'Synthetic Oil'
    },
    {
      categoryId: 11,
      parentCategoryId: 1,
      title: 'High-Mileage Oil'
    },
    {
      categoryId: 12,
      parentCategoryId: 1,
      title: 'Synthetic Blend Oil'
    },
    {
      categoryId: 13,
      parentCategoryId: 1,
      title: 'Conventional Oil'
    },
    {
      categoryId: 14,
      parentCategoryId: 3,
      title: 'Classic Engines'
    }
  ];

  backendOwnedBusinesses: IBusinessModel[] = [
    {
      businessId: 1,
      ownerId: 'GUID',
      title: 'Krishi Ghor'
    },
    {
      businessId: 2,
      ownerId: 'GUID',
      title: 'FM Sky Vision'
    }
  ];
  
  selectedBusiness: string | undefined = undefined;

  selectedCategoryId: Number | undefined = undefined;

  categories: ICategoryModel[] = [];

  subcategories: ICategoryModel[] = [];

  ownedBusinesses: IBusinessModel[] = [];

  constructor(private windowService: NbWindowService, private toastrService: NbToastrService) {
    this.ownedBusinesses = this.backendOwnedBusinesses;
    if(this.backendOwnedBusinesses.length > 0)
      this.selectBusiness(this.backendOwnedBusinesses[0].businessId);
  }

  loadSubcategories(categoryId: Number) {
    this.subcategories.splice(0);
    for (let index = 0; index < this.backendDataSubCategories.length; index++) {
      if(this.backendDataSubCategories[index].parentCategoryId == categoryId)
        this.subcategories.push(this.backendDataSubCategories[index]);
      
      this.selectedCategoryId = categoryId;
    }
  }

  openSaveCategoryWindow(windowMessage: string, isSubcategory: boolean, categoryObj: ICategoryModel | null) {
    let url: string;
    let method: string;
    let toasterMsg: string = '';

    // You can not add a subcategory without having a category selected
    if (isSubcategory) {
      if (this.selectedCategoryId == null || this.selectedCategoryId == undefined) {
        this.toastrService.warning('Please select a category first', 'Warning');
        return;
      }
      url = '/api/Subcategory'
    }
    else {
      url = '/api/Category';
    }

    // If UI sent an object, it's an update operation
    // Otherwise it's an incertion operation
    let windowRef = this.windowService.open(AddCategoryComponent, {
      title: windowMessage,
      buttons: {
        close: false,
        fullScreen: true,
        maximize: true,
        minimize: true
      }
    });

    windowRef.onClose.subscribe((categoryTitle) => {
      // If user closes the window without saving anything, we do not need to process anything
      // First if shields against that
      if (categoryTitle != undefined && categoryTitle != null) {
        // If user used update button, categoryObj brought the stock object for us
        // If the user used create button, categoryObj shall remain null
        if (categoryObj == null) {
          method = 'POST';
          toasterMsg = 'Saved Successfully';
          categoryObj = { title: categoryTitle, categoryId: 0, parentCategoryId: undefined };
        } else {
          method = 'PUT';
          toasterMsg = 'Updated Successfully';
          categoryObj.title = categoryTitle;
        }
        
        // Replace the console logs with http request bellow
        // Calling the backend API when pre processing is ready
        console.log('URL', url); 
        console.log('Method', method); 
        console.log('Body', categoryObj);
        this.toastrService.success(toasterMsg, 'Success');
      }
    });
  }

  openDeleteCategoryWindow(windowMessage: string, categoryId: Number) {
    // Load pop up dialogue
    let windowRef = this.windowService.open(RemoveCategoryComponent, {
      title: windowMessage,
      buttons: {
        close: false,
        fullScreen: true,
        maximize: true,
        minimize: true
      },
    });

    // Remove element
    windowRef.onClose.subscribe((deleteEntry) => {
      if (deleteEntry) {
        this.categories.forEach(element => {
          if (element.categoryId == categoryId) {
            let index = this.categories.indexOf(element);
            this.categories.splice(index);
            return;
          }
        });
      }
    });
  }

  selectBusiness(businessId: Number) {
    this.backendOwnedBusinesses.filter((elem) => {
      if (elem.businessId == businessId) {
        // Load product categories of selected business
        this.selectedBusiness = elem.title;
        this.categories = this.backendDataCategories;
      }
    })
  }

  openSaveBusinessWindow(windowMessage: string, businessModel: IBusinessModel | null) {
    let url: string;
    let method: string;
    let toasterMsg: string = '';

    // If UI sent an object, it's an update operation
    // Otherwise it's an incertion operation
    let windowRef = this.windowService.open(AddCategoryComponent, {
      title: windowMessage,
      buttons: {
        close: false,
        fullScreen: true,
        maximize: true,
        minimize: true
      }
    });

    windowRef.onClose.subscribe((businessTitle) => {
      // If user closes the window without saving anything, we do not need to process anything
      // First if shields against that
      if (businessTitle != undefined && businessTitle != null) {
        // If user used update button, businessModel brought the stock object for us
        // If the user used create button, businessModel shall remain null
        if (businessModel == null) {
          method = 'POST';
          toasterMsg = 'Saved Successfully';
          businessModel = { title: businessTitle, businessId: 0, ownerId: 'GUID' };
        } else {
          method = 'PUT';
          toasterMsg = 'Updated Successfully';
          businessModel.title = businessTitle;
        }
        
        // Replace the console logs with http request bellow
        // Calling the backend API when pre processing is ready
        console.log('URL', url); 
        console.log('Method', method); 
        console.log('Body', businessModel);
        this.toastrService.success(toasterMsg, 'Success');
      }
    });
  }

  openDeleteBusinessWindow(windowMessage: string, businessId: Number) {
    // Load pop up dialogue
    let windowRef = this.windowService.open(RemoveCategoryComponent, {
      title: windowMessage,
      buttons: {
        close: false,
        fullScreen: true,
        maximize: true,
        minimize: true
      },
    });

    // Remove element
    windowRef.onClose.subscribe((deleteEntry) => {
      if (deleteEntry) {
        this.ownedBusinesses.filter(element => {
          if (element.businessId == businessId) {
            let index = this.ownedBusinesses.indexOf(element);
            this.ownedBusinesses.splice(index);
            return;
          }
        });
      }
    });
  }
}
