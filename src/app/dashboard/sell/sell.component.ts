import { Component } from '@angular/core';
import { ISalesModel } from '../Models/ISalesModel';
import { IProductModel } from '../Models/IProductModel';
import { IBusinessModel } from '../Models/IBusinessModel';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { DashboardService } from '../dashboard.service';
import { SalesService } from './sell.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent {
  cardHeader: string = 'Product Sales';

  outlets: IBusinessModel[];

  pagedSalesModel: IPaginationModel<ISalesModel>;

  constructor(
    dashboardService: DashboardService,
    private salesService: SalesService,
    private ngxPaginationService: NGXPaginationService<ISalesModel>
  ) {
    this.outlets = dashboardService.getOutlets();

    this.pagedSalesModel = dashboardService.getPagingConfig(AddSalesComponent);

    if(this.pagedSalesModel.tableConfig)
      this.pagedSalesModel.tableConfig.tableMaping = {
        "Memo No": "MemoNumber",
        "Net Total": "NetTotal",
        "Paid Amount": "PaidAmount",
        "Sales Date": "SalesDate",
      };
  }

  selectOutlet(outletId: number, event: any): void{
    this.salesService.selectedOutletId = outletId;

    // Add active class to source element and remove from sibling elements
    let sourceElem = event.srcElement;
    Array.from(sourceElem.parentNode.children).forEach((element: any) => {
      if(element != sourceElem)
        element.classList.remove('active');
      else
        element.classList.add('active');
    });

    let pageLength: number = this.pagedSalesModel.pagingConfig? this.pagedSalesModel.pagingConfig.pageLength : 5;
    let searchString: string = this.pagedSalesModel.searchingConfig? this.pagedSalesModel.searchingConfig.searchString : "";
    this.pagedSalesModel.sourceData = this.salesService.getSalesList(outletId, 1, pageLength, searchString);
    this.ngxPaginationService.set(this.pagedSalesModel);
  }
}
