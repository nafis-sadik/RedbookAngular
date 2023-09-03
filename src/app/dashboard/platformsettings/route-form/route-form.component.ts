import { ApplicationRef, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { RouteService } from '../../services/route.service';
import { IRouteModel } from '../../Models/IRouteModel';
import { IApplicationModel } from '../../Models/IApplicationModel';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss']
})
export class RouteFormComponent implements OnInit {
  routeForm: FormGroup;
  inputModel: IRouteModel;
  appList: Array<IApplicationModel>;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private routeService: RouteService,
    private toasterService: NbToastrService,
    private changeDetector: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private paginationService: NGXPaginationService<IRouteModel>,
    private dialogRef: NbDialogRef<RouteFormComponent>
  ){ }

  ngOnInit(): void {
    // Generate form group, 2 way model binding
    this.routeForm = this.fb.group({
      routeName: [this.inputModel.routeName, Validators.required],
      routeValue: [this.inputModel.routeValue, Validators.required],
      applicationId: [this.inputModel.applicationId, Validators.required],
      description: [this.inputModel.description, Validators.required]
    });

    // View Model binding with reactive form
    this.routeForm.valueChanges.subscribe(value => {
      this.inputModel.routeName = value.routeName;
      this.inputModel.routeValue = value.routeValue;
      this.inputModel.applicationId = value.applicationId;
      this.inputModel.description = value.description;
    });

    // Handle application selection
    this.appService.getAllApplications().subscribe(value => {
      // Load data for dropdown
      this.appList = value;

      // For update operation
      if(this.inputModel !== undefined){
        // Load data into the model
        // returned to break loop, this part is here for app id
        this.appList.forEach(app => {
          if(app.applicationName ===  this.inputModel.applicationName){
            this.inputModel.applicationId = app.id
            return;
          }
        });
      }
    })
  }

  callApi(): Observable<IRouteModel>{
    if(this.inputModel.id == undefined || this.inputModel.id == null || this.inputModel.id <= 0){
      return this.routeService.addNewRoute(this.inputModel);
    } else {
      return this.routeService.updateNewRoute(this.inputModel);
    }
  }

  saveRoute(): void{
    let loaderContainer: HTMLElement| null = document.getElementById('LoadingScreen');
    if(loaderContainer){
      loaderContainer.classList.add('d-block');
      loaderContainer.classList.remove('d-none');
    }

    this.callApi()
    .subscribe(
      (response) => {
        let paginationData: any;
        this.paginationService.get().subscribe((paginationModel) => {
          if(paginationModel.tableConfig?.sourceData.length){
            for(let i = 0; i < paginationModel.tableConfig.sourceData.length; i++){
              if(paginationModel.tableConfig.sourceData[i].id == response.id){
                paginationModel.tableConfig.sourceData[i].routeName = response.routeName;
                paginationModel.tableConfig.sourceData[i].routeValue = response.routeValue;
                paginationModel.tableConfig.sourceData[i].applicationId = response.applicationId;
                paginationModel.tableConfig.sourceData[i].description = response.description;

                break;
              }
            }

            paginationData = paginationModel;
          }
          });

          if(loaderContainer){
            loaderContainer.classList.remove('d-block');
            loaderContainer.classList.add('d-none');

            paginationData.tableCardHeader = 'chutiya';
            this.paginationService.set(paginationData);
            this.paginationService.set(paginationData);
            this.appRef.tick();
            this.changeDetector.detectChanges();
            this.dialogRef.close();
          }
        },
      (err) => {
        this.toasterService.danger(err.error, 'Failed to execute operation');

        if(loaderContainer){
          loaderContainer.classList.remove('d-block');
          loaderContainer.classList.add('d-none');
        }
      });
  }
}
