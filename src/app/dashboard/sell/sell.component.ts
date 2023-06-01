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

    this.pagedSalesModel = dashboardService.getPagingConfig(AddSalesComponent, 'New Sales');
    
    if(this.pagedSalesModel.tableConfig){
      this.pagedSalesModel.tableConfig.tableMaping = {
        "Memo No": "MemoNumber",
        "Net Total": "NetTotal",
        "Paid Amount": "PaidAmount",
        "Sales Date": "SalesDate",
      };

      this.pagedSalesModel.tableConfig.onEdit = () => {
        console.log('onEdit');
      };
      
      this.pagedSalesModel.tableConfig.onDelete = () => {
        console.log('onDelete');
      };
    }
  }

  selectOutlet(outletId: number, event: any): void{
    this.salesService.selectedOutletId = outletId;

    // Is display is hidden, make it visible
    let dataTableCard = Array.from(document.getElementsByTagName('ngx-pagination'))[0];
    if(dataTableCard && dataTableCard.classList.contains('d-none'))
      dataTableCard.classList.remove('d-none');

    // Add active class to source element and remove from sibling elements
    let sourceElem = event.srcElement;
    Array.from(sourceElem.parentNode.children).forEach((element: any) => {
      if(element != sourceElem)
        element.classList.remove('active');
      else
        element.classList.add('active');
    });

    // Get data from service
    let pageLength: number = this.pagedSalesModel.pagingConfig? this.pagedSalesModel.pagingConfig.pageLength : 5;
    let searchString: string = this.pagedSalesModel.searchingConfig? this.pagedSalesModel.searchingConfig.searchString : "";
    // Set data to observable view model to render in UI
    this.pagedSalesModel.sourceData = this.salesService.getSalesList(outletId, 1, pageLength, searchString);
    this.ngxPaginationService.set(this.pagedSalesModel);
  }
}
