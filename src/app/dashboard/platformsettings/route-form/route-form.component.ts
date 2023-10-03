import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { RouteService } from '../../services/route.service';
import { IRouteModel } from '../../Models/IRouteModel';
import { IApplicationModel } from '../../Models/IApplicationModel';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss']
})
export class RouteFormComponent implements OnInit {
  routeForm: FormGroup;
  inputModel: IRouteModel;
  appList: Array<IApplicationModel>;
  routeList: Array<IRouteModel>;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private routeService: RouteService,
    private toasterService: NbToastrService,
    private dialogRef: NbDialogRef<RouteFormComponent>,
    private paginationService: NGXPaginationService<IRouteModel>,
  ){ }

  ngOnInit(): void {
    // Generate form group
    // 2 way model binding - Load data to form and add validation
    this.routeForm = this.fb.group({
      routeName: [this.inputModel.routeName, Validators.required],
      routeValue: [this.inputModel.routeValue],
      applicationId: [this.inputModel.applicationId, Validators.required],
      description: [this.inputModel.description],
      parentRouteId: [this.inputModel.parentRouteId]
    });

    // 2 way model binding - Load data from form to view model
    this.routeForm.valueChanges.subscribe((value) => {
      this.inputModel.applicationId = value.applicationId;
      this.inputModel.description = value.description;
      this.inputModel.routeName = value.routeName;
      this.inputModel.routeValue = value.routeValue;
      this.inputModel.parentRouteId = value.parentRouteId;
    });

    // Load data for dropdown
    this.appService.getAllApplications().subscribe(value => {
      this.appList = value;
    });

    this.routeService.getAllRoute().subscribe(routeListResponse => {
      this.routeList = routeListResponse;
    });
  }

  saveRoute(): void{
    let loaderContainer: HTMLElement|null = document.getElementById('LoadingScreen');
    if(loaderContainer){
      loaderContainer.classList.add('d-block');
      loaderContainer.classList.remove('d-none');
    }

    if(this.inputModel.id == undefined || this.inputModel.id == null || this.inputModel.id <= 0){
      this.routeService.addNewRoute(this.inputModel)
        .subscribe(() => {
          window.location.reload()
        })
    } else {
      this.routeService.updateNewRoute(this.inputModel)
        .subscribe(
          (response) => {
            // Switched to reload as actions have method bindings which unbinds
            // UI update works fine
            // Multiple set not required anymore
            if(loaderContainer){
              loaderContainer.classList.remove('d-none');
              loaderContainer.classList.add('d-block');

              this.dialogRef.close();

              this.toasterService.success('Success', 'Saved Successfully')
            }
            
            window.location.reload();
            return;

            // Get pagination data to update table
            // this.paginationService.get().subscribe((paginationModel) => {
            //   if(paginationModel.tableConfig?.sourceData.length){
            //     // Pick row from table data and update from response data
            //     for(let i = 0; i < paginationModel.tableConfig.sourceData.length; i++){
            //       if(paginationModel.tableConfig.sourceData[i].id == response.id){
            //         paginationModel.tableConfig.sourceData[i].routeName = response.routeName;
            //         paginationModel.tableConfig.sourceData[i].routeValue = response.routeValue;
            //         paginationModel.tableConfig.sourceData[i].applicationId = response.applicationId;
            //         paginationModel.tableConfig.sourceData[i].description = response.description;

            //         // Break the loop as we don't allow multiple update from UI
            //         // So, after data is found, no further interation is necessary
            //         break;
            //       }
            //     }

            //     this.paginationService.set(paginationModel);
            //   }
            // });

            // if(loaderContainer){
            //   loaderContainer.classList.remove('d-block');
            //   loaderContainer.classList.add('d-none');

            //   this.dialogRef.close();

            //   this.toasterService.success('Success', 'Saved Successfully')
            // }
          },
          (err) => {
            console.log(err)
            this.toasterService.danger(err.error, 'Failed to execute operation');

            if(loaderContainer){
              loaderContainer.classList.remove('d-block');
              loaderContainer.classList.add('d-none');
            }
          });
    }
  }
}
