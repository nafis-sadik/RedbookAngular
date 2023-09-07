import { Component, OnInit } from '@angular/core';
import { IRouteModel } from '../Models/IRouteModel';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { DashboardService } from '../services/dashboard.service';
import { RouteFormComponent } from './route-form/route-form.component';
import { RouteService } from '../services/route.service';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { NbDialogService } from '@nebular/theme';
import { IParamModel } from 'src/app/shared/ngx-pagination/Models/IParamModel';

@Component({
  selector: 'app-platformsettings',
  templateUrl: './platformsettings.component.html',
  styleUrls: ['./platformsettings.component.scss']
})
export class PlatformsettingsComponent implements OnInit{
  public pagedRouteModel: IPaginationModel<IRouteModel>;

  constructor(
    dashboardService: DashboardService,
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

      this.pagedRouteModel.tableConfig.onView = (routeModel: IRouteModel) => {
        console.log(routeModel);
      }

      this.pagedRouteModel.tableConfig.onDelete = (routeId: number) => {
        console.log(routeId);
      }

      this.pagedRouteModel.tableConfig.actionColWidth = '150px';
    }

    if(this.pagedRouteModel.addNewElementButtonConfig){
      this.pagedRouteModel.addNewElementButtonConfig.onAdd = () => {
        this.dialogService.open(RouteFormComponent, {
          context: {
            inputModel: {
              id: 0,
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
                this.pagedRouteModel.pagingConfig.pageNumber = tableParameters.pageNumber;
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
