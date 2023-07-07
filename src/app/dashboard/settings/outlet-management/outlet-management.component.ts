import { Component } from '@angular/core';
import { IBusinessModel } from '../../Models/IBusinessModel';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { AddDialogueComponent } from '../../../shared/ngx-dialogues/add-dialogue/add-dialogue.component';
import { RemoveDialogueComponent } from '../../../shared/ngx-dialogues/remove-dialogue/remove-dialogue.component';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-outlet-management',
  templateUrl: './outlet-management.component.html',
  styleUrls: ['./outlet-management.component.scss']
})
export class OutletManagementComponent {
  ownedBusinesses: IBusinessModel[];

  constructor(private windowService: NbWindowService, private toastrService: NbToastrService, private dashboardService: DashboardService) {
    this.ownedBusinesses = this.dashboardService.getOutlets();
    console.log(this.ownedBusinesses)
  }

  openSaveBusinessWindow(windowMessage: string, businessModel: IBusinessModel | null) {
    let url: string;
    let method: string;
    let toasterMsg: string = '';

    // If UI sent an object, it's an update operation
    // Otherwise it's an incertion operation
    let windowRef = this.windowService.open(AddDialogueComponent, {
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
          businessModel = { title: businessTitle, businessId: 0, ownerId: 'GUID', address: null };
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

  openDeleteBusinessWindow(windowMessage: string, businessId: number) {
    // Load pop up dialogue
    let windowRef = this.windowService.open(RemoveDialogueComponent, {
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
