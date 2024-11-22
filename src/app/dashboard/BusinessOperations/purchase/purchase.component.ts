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

  outlets: Array<OrganizationModel>;

  pagedPurchaseModel: IPaginationModel<PurchaseInvoiceModel>;

  loader: HTMLElement | null;

  constructor(
    private orgService: OrganizationService,
    private dashboardService: DashboardService,
    private purchaseService: PurchaseService,
    private cdRef: ChangeDetectorRef,
    private ngxPaginationService: NGXPaginationService<PurchaseInvoiceModel>
  ) {
    this.loader = document.getElementById('LoadingScreen');
    this.orgService.getUserOrgs()
      .subscribe(response => {
        this.outlets = response;
        if (this.loader && this.loader.classList.contains('d-block')) {
          this.loader.classList.remove('d-block');
          this.loader.classList.add('d-none');
          this.cdRef.detectChanges();
        }
      });

    this.pagedPurchaseModel = dashboardService.getPagingConfig(AddPurchaseComponent, 'Purchase Records', 'Add New Purchase');

    if (this.pagedPurchaseModel.tableConfig) {
      this.pagedPurchaseModel.tableConfig.tableMaping = {
        "Invoice Number": "chalanNumber",
        "Vendor Name": "vendorName",
        "Chalan Date": "chalanDate",
        "Payment Status": "paymentStatus",
        "Invoice Total": "invoiceTotal",
        "Paid Amount": "totalPaid"
      };

      this.pagedPurchaseModel.tableConfig.onEdit = (model: PurchaseInvoiceModel) => {
        dashboardService.ngDialogService.open(AddPurchaseComponent, {
          context: {
            invoiceModel: model
          }
        });
      }

      this.pagedPurchaseModel.tableConfig.onDelete = () => {
        console.log('onDelete');
      };
    }

    if (this.pagedPurchaseModel.addNewElementButtonConfig) {
      this.pagedPurchaseModel.addNewElementButtonConfig.onAdd = () => {
        dashboardService.ngDialogService.open(AddPurchaseComponent, {
          context: {
            invoiceModel: new PurchaseInvoiceModel()
          }
        });
      }
    }

    this.purchaseService.listenInvoiceModel()
      .subscribe((invoiceModel: PurchaseInvoiceModel) => {
        // Parse the date string to a Date object 
        let localDate = new Date(invoiceModel.chalanDate); 
        
        // Convert the local date to UTC 
        let utcDate = new Date(
          Date.UTC( localDate.getFullYear(), 
            localDate.getMonth(), 
            localDate.getDate(), 
            localDate.getHours(), 
            localDate.getMinutes(), 
            localDate.getSeconds() 
          )); // Format the UTC date as needed (ISO string in this example) 
          
        let utcDateString = utcDate.toISOString();
        invoiceModel.chalanDate = utcDateString;
        invoiceModel.organizationId = this.selectedOutlet;
        console.log('invoiceModel', invoiceModel);
        this.purchaseService.addPurchaseIncoice(invoiceModel)
          .subscribe(() => {
            if (this.pagedPurchaseModel.pagingConfig) {
              this.pagedPurchaseModel.pagingConfig.pageNumber = Math.ceil(this.pagedPurchaseModel.pagingConfig.totalItems / this.pagedPurchaseModel.pagingConfig.pageLength);
              this.getPagedInvoice();
            }
          });
      })
  }

  selectOutlet(outletId: number, event: any): void {
    this.dashboardService.selectedOutletId = outletId;

    // If display is hidden, make it visible
    let dataTableCard = Array.from(document.getElementsByTagName('ngx-pagination'))[0];
    if (dataTableCard && dataTableCard.classList.contains('d-none'))
      dataTableCard.classList.remove('d-none');

    // Add active class to source element and remove from sibling elements
    let sourceElem = event.srcElement;
    Array.from(sourceElem.parentNode.children).forEach((element: any) => {
      if (element != sourceElem)
        element.classList.remove('active');
      else
        element.classList.add('active');
    });

    // API Call
    this.getPagedInvoice();
  }

  getPagedInvoice() {
    if (this.pagedPurchaseModel.tableConfig) {
      this.purchaseService.getPagedPurchaseInvoice(this.selectedOutlet, this.pagedPurchaseModel)
        .subscribe((response: any) => {
          if (this.loader && this.loader.classList.contains('d-block')) {
            this.loader.classList.remove('d-block');
            this.loader.classList.add('d-none');
            this.cdRef.detectChanges();
          }

          if (this.pagedPurchaseModel.tableConfig) {
            this.pagedPurchaseModel.tableConfig.sourceData = response.sourceData;
          
            this.pagedPurchaseModel.tableConfig.sourceData.forEach(invoice => {
              // Parse the UTC date string to a Date object
              let utcDate = new Date(invoice.chalanDate.toString());

              // Convert the UTC date to local time
              let localDate = new Date(utcDate.toLocaleString());

              // Format the local date as needed (e.g., ISO string)
              invoice.chalanDate = localDate.toDateString();
            });
          }

          if(this.pagedPurchaseModel.pagingConfig) {
            this.pagedPurchaseModel.pagingConfig.pageNumber = response.pageNumber;
            this.pagedPurchaseModel.pagingConfig.pageLength = response.pageLength;
            this.pagedPurchaseModel.pagingConfig.totalItems = response.totalItems;
          }

          this.ngxPaginationService.set(this.pagedPurchaseModel);
        });
    }
  }
}
