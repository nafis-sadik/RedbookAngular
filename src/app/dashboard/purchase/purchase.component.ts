import { Component } from '@angular/core';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { IInvoiceModel } from '../Models/IInvoiceModel';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { IBusinessModel } from '../Models/IBusinessModel';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { PurchaseService } from './purchase.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})

export class PurchaseComponent {
  cardHeader: string = "Product Purchase";

  selectedOutlet: number = 0;

  outlets: IBusinessModel[];

  pagedPurchaseModel: IPaginationModel<IInvoiceModel>;

  constructor(
    dashboardService: DashboardService,
    private purchaseService: PurchaseService,
    private ngxPaginationService: NGXPaginationService<IInvoiceModel>
  )
  {
    this.outlets = dashboardService.getOutlets();

    this.pagedPurchaseModel = dashboardService.getPagingConfig(AddPurchaseComponent, 'New Purchase');

    if(this.pagedPurchaseModel.tableConfig){
      this.pagedPurchaseModel.tableConfig.tableMaping = {
        "Invoice Number": "InvoiceNo",
        "Client Name": "ClientName",
        "Issue Date": "IssueDate",
        "Payment Status": "PaymentStatus",
        "Invoice Total": "InvoiceTotal",
        "Paid Amount": "PaidAmount"
      };

      this.pagedPurchaseModel.tableConfig.onEdit = () => {
        console.log('onEdit');
      };

      this.pagedPurchaseModel.tableConfig.onDelete = () => {
        console.log('onDelete');
      };
    }
  }

  selectOutlet(outletId: number, event: any): void{
    this.purchaseService.selectedOutletId = outletId;

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

    let pageLength: number = this.pagedPurchaseModel.pagingConfig? this.pagedPurchaseModel.pagingConfig.pageLength : 5;
    let searchString: string = this.pagedPurchaseModel.searchingConfig? this.pagedPurchaseModel.searchingConfig.searchString : "";
    this.pagedPurchaseModel.sourceData = this.purchaseService.getInvoiceList(outletId, 1, pageLength, searchString);
    this.ngxPaginationService.set(this.pagedPurchaseModel);
  }
}
