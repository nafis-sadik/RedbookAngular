import { Component } from '@angular/core';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { OrganizationModel } from '../../Models/organization.model';
import { DashboardService } from '../../services/dashboard.service';
import { OrganizationService } from '../../services/organization.service';
import { PurchaseService } from '../../services/purchase.service';
import { PurchaseInvoiceModel } from '../../Models/purchase-invoice.model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})

export class PurchaseComponent {
  isUpdateOperation: boolean = false;

  cardHeader: string = "Product Purchase";

  selectedOutlet: number = 0;

  outlets: OrganizationModel[];

  pagedPurchaseModel: IPaginationModel<PurchaseInvoiceModel>;

  constructor(
    private orgService: OrganizationService,
    private dashboardService: DashboardService,
    private purchaseService: PurchaseService,
    private ngxPaginationService: NGXPaginationService<PurchaseInvoiceModel>
  )
  {
    // orgService.getAllOrganizations()
    //   .subscribe(response => {
    //     this.outlets = response;
    //   });

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
        this.isUpdateOperation = true;

        dashboardService.ngDialogService.open(AddPurchaseComponent, {
          context: {
            isUpdateOperation: this.isUpdateOperation
          }
        });
      }

      this.pagedPurchaseModel.tableConfig.onDelete = () => {
        console.log('onDelete');
      };
    }

    if(this.pagedPurchaseModel.addNewElementButtonConfig){
      this.pagedPurchaseModel.addNewElementButtonConfig.onAdd = () => {
        this.isUpdateOperation = false;

        dashboardService.ngDialogService.open(AddPurchaseComponent, {
          context: {
            isUpdateOperation: this.isUpdateOperation
          }
        });
      }
    }
  }

  selectOutlet(outletId: number, event: any): void{
    this.dashboardService.selectedOutletId = outletId;

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
    if (this.pagedPurchaseModel.tableConfig) {
      this.purchaseService.getInvoiceList(outletId, 1, pageLength, searchString)
        .subscribe(response => {
          if(this.pagedPurchaseModel.tableConfig){
            this.pagedPurchaseModel.tableConfig.sourceData = response;
          }
          
          this.ngxPaginationService.set(this.pagedPurchaseModel);
        });
    }
  }
}
