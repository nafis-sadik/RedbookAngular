import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { IBusinessModel } from '../Models/IBusinessModel';
import { ICategoryModel } from '../Models/ICategoryModel';

@Component({
  selector: 'app-ums',
  templateUrl: './ums.component.html',
  styleUrls: ['./ums.component.scss']
})
export class UmsComponent {
  ownedBusinesses: IBusinessModel[];
  categories: ICategoryModel[];
  constructor(private dashboardService: DashboardService) {
    this.ownedBusinesses = dashboardService.getOutlets();
    this.categories = dashboardService.loadCategories(dashboardService.selectedOutletId);
  }

  loadUsers(outletId: number): void{

  }

  openSaveBusinessWindow(pram1: string, pram2: any){ }
  openDeleteBusinessWindow(pram1: string, pram2: any){ }

  loadSubcategories(selectedCategopryId: number): void{
    this.categories = this.dashboardService.loadSubcategories(selectedCategopryId);
  }

  removeCategory(windowLabel: string, categoryId: number){ }
  saveCategory(windowLabel: string, categoryModel: ICategoryModel | null){ }
}
