import { Component } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryModel } from './category-model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  backendDataCategories: CategoryModel[] = [
    {
      categoryId: 1,
      parentCategoryId: undefined,
      title: 'Oil'
    },
    {
      categoryId: 2,
      parentCategoryId: undefined,
      title: 'Motors'
    }
  ];

  categories: CategoryModel[] = [];

  backendDataSubCategories: CategoryModel[] = [
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
      parentCategoryId: 2,
      title: 'Shallow Motor'
    },
    {
      categoryId: 6,
      parentCategoryId: 2,
      title: 'Deep Tubewell Motor'
    },
    {
      categoryId: 7,
      parentCategoryId: 2,
      title: 'AC Motor'
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
    }
  ];

  subcategories: CategoryModel[] = [];

  constructor(private windowService: NbWindowService) {
    this.categories = this.backendDataCategories;
  }

  loadSubcategories(categoryId: Number) {
    this.subcategories.splice(0);
    for (let index = 0; index < this.backendDataSubCategories.length; index++) {
      if(this.backendDataSubCategories[index].parentCategoryId == categoryId)
        this.subcategories.push(this.backendDataSubCategories[index]);      
    }
  }

  openAddCategoryWindow(windowMessage: string) {
    this.windowService.open(AddCategoryComponent, { title: windowMessage });
  }
}
