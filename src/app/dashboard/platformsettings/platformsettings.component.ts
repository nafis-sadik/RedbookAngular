import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { RouteFormComponent } from './route-form/route-form.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { RouteService } from '../services/route.service';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { IRouteModel } from '../Models/IRouteModel';
import { IParamModel } from 'src/app/shared/ngx-pagination/Models/IParamModel';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';

@Component({
  selector: 'app-platformsettings',
  templateUrl: './platformsettings.component.html',
  styleUrls: ['./platformsettings.component.scss']
})
export class PlatformsettingsComponent implements OnInit{
  public pagedRouteModel: IPaginationModel<IRouteModel>;

  constructor(
    dashboardService: DashboardService,
    toasterService: NbToastrService,
    private routeService: RouteService,
    public dialogService: NbDialogService,
    private ngxPaginationService: NGXPaginationService<IRouteModel>
  ){
    this.pagedRouteModel = dashboardService.getPagingConfig<IRouteModel>(RouteFormComponent, 'Routes', 'Add Route');

    if(this.pagedRouteModel.tableConfig){
      this.pagedRouteModel.tableConfig.tableMaping = {
        "Route Name": "routeName",
        "Route": "routeValue",
        "Description": "description",
        "Application": "applicationName"
      };

      this.pagedRouteModel.tableConfig.onEdit = (routeData: IRouteModel) => {
        this.dialogService.open(RouteFormComponent, {
          context: {
            inputModel: routeData
          },
        });
      }

      this.pagedRouteModel.tableConfig.onView = null;
      // this.pagedRouteModel.tableConfig.onView = (routeModel: IRouteModel) => {
      //   console.log(routeModel);
      // }

      // this.pagedRouteModel.tableConfig.onDelete = null;
      this.pagedRouteModel.tableConfig.onDelete = (routeModel: IRouteModel) => {
        this.routeService.deleteRoute(routeModel.routeId)
          .subscribe(() => {
            toasterService.success('operation successfull');
            location.reload();
          });
      }

      this.pagedRouteModel.tableConfig.actionColWidth = '50px';
    }

    if(this.pagedRouteModel.addNewElementButtonConfig){
      this.pagedRouteModel.addNewElementButtonConfig.onAdd = () => {
        this.dialogService.open(RouteFormComponent, {
          context: {
            inputModel: {
              routeId: 0,
              routeName: '',
              routeValue: '',
              description: '',
              applicationId: 0,
              applicationName: '',
              parentRouteId: 0
            },
          }
        });
      }
    }

    // This if is to ensure that the event method binding is successful
    // This if won't be executed on event trigger
    if(this.pagedRouteModel.pagingConfig){
      this.pagedRouteModel.pagingConfig.onUpdate = (pagingInfo: any) => {
        // This shall be executed during event triggers
        if(this.pagedRouteModel.pagingConfig){
          this.pagedRouteModel.pagingConfig.pageLength = pagingInfo.pageLength;
          this.pagedRouteModel.pagingConfig.pageNumber = pagingInfo.pageNumber;
        }

        this.loadData();
      }      

      if(this.pagedRouteModel.searchingConfig){
        this.pagedRouteModel.searchingConfig.onSearch = (tableParameters: IParamModel) => { 
          if(this.pagedRouteModel.searchingConfig){
            if(tableParameters){
              if(tableParameters.searchString)
                this.pagedRouteModel.searchingConfig.searchString = tableParameters.searchString;
              if(this.pagedRouteModel.pagingConfig){
                this.pagedRouteModel.pagingConfig.pageNumber = 1;
                this.pagedRouteModel.pagingConfig.pageLength = tableParameters.pageLength;
              }
              
              this.routeService.getPagedRoute(this.pagedRouteModel);
            }

            this.loadData();
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    let loaderContainer: HTMLElement| null = document.getElementById('LoadingScreen');
    if(loaderContainer){
      loaderContainer.classList.add('d-block');
      loaderContainer.classList.remove('d-none');
    }

    this.routeService.getPagedRoute(this.pagedRouteModel)
      .subscribe(response => {
        if(this.pagedRouteModel.tableConfig){
          this.pagedRouteModel.tableConfig.sourceData = response.sourceData;
        }

        if(this.pagedRouteModel.pagingConfig){
          this.pagedRouteModel.pagingConfig.pageNumber = response.pageNumber;
          this.pagedRouteModel.pagingConfig.pageLength = response.pageSize;
          this.pagedRouteModel.pagingConfig.totalItems = response.totalItems;
        }

        if(this.pagedRouteModel.searchingConfig){
          this.pagedRouteModel.searchingConfig.searchString = response.searchString;
        }

        this.ngxPaginationService.set(this.pagedRouteModel);
        setTimeout(() => {
          if(loaderContainer){
            loaderContainer.classList.remove('d-block');
            loaderContainer.classList.add('d-none');
          }
        }, 1.5 * 1000);
      });
  }
}
