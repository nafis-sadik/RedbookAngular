import { ChangeDetectorRef, Component } from '@angular/core';
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
  cardHeader: string = "Product Purchase";

  selectedOutlet: number = 0;

  outlets: OrganizationModel[];

  pagedPurchaseModel: IPaginationModel<PurchaseInvoiceModel>;

  loader: HTMLElement | null;

  constructor(
    private orgService: OrganizationService,
    private dashboardService: DashboardService,
    private purchaseService: PurchaseService,
    private cdRef: ChangeDetectorRef,
    private ngxPaginationService: NGXPaginationService<PurchaseInvoiceModel>
  )
  {
    this.loader = document.getElementById('LoadingScreen');
    this.orgService.getUserOrgs()
      .subscribe(response => {
        this.outlets = response;
        if(this.loader && this.loader.classList.contains('d-block')){
          this.loader.classList.remove('d-block');
          this.loader.classList.add('d-none');
          this.cdRef.detectChanges();
        }
      });

    this.pagedPurchaseModel = dashboardService.getPagingConfig(AddPurchaseComponent, 'Purchase Records', 'Add New Purchase');

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
        dashboardService.ngDialogService.open(AddPurchaseComponent, {
          context: {
            invoiceModel: new PurchaseInvoiceModel()
          }
        });
      }

      this.pagedPurchaseModel.tableConfig.onDelete = () => {
        console.log('onDelete');
      };
    }

    if(this.pagedPurchaseModel.addNewElementButtonConfig){
      this.pagedPurchaseModel.addNewElementButtonConfig.onAdd = () => {
        dashboardService.ngDialogService.open(AddPurchaseComponent, {
          context: {
            invoiceModel: new PurchaseInvoiceModel()
          }
        });
      }
    }
  }

  selectOutlet(outletId: number, event: any): void{
    this.dashboardService.selectedOutletId = outletId;

    // If display is hidden, make it visible
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

    // API Call
    if (this.pagedPurchaseModel.tableConfig) {
      this.purchaseService.getInvoiceList(outletId, this.pagedPurchaseModel)
        .subscribe(response => {
          if (this.loader && this.loader.classList.contains('d-block')) {
            this.loader.classList.remove('d-block');
            this.loader.classList.add('d-none');
            this.cdRef.detectChanges();
          }

          if(this.pagedPurchaseModel.tableConfig && response.tableConfig){
            this.pagedPurchaseModel.tableConfig.sourceData = response.tableConfig.sourceData;
          }
          
          this.ngxPaginationService.set(this.pagedPurchaseModel);
        });
    }
  }
}
