import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IRouteModel } from '../Models/IRouteModel';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';
import { DashboardService } from '../services/dashboard.service';
import { RouteFormComponent } from './route-form/route-form.component';
import { RouteService } from '../services/route.service';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';

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
    private changeDetector: ChangeDetectorRef,
    private ngxPaginationService: NGXPaginationService<IRouteModel>
  ){
    this.pagedRouteModel = dashboardService.getPagingConfig<IRouteModel>(RouteFormComponent, 'Routes', 'Add Route');

    if(this.pagedRouteModel.tableConfig){
      this.pagedRouteModel.tableConfig.tableMaping = {
        "Route Id": "id",
        "Route Name": "routeName",
        "Route": "routeValue",
        "Description": "description",
        "Application": "applicationName"
      };

      this.pagedRouteModel.tableConfig.onEdit = (info: any) => {
        console.log(info);
      }

      this.pagedRouteModel.tableConfig.onView = (info: any) => {
        console.log(info);
      }

      this.pagedRouteModel.tableConfig.onDelete = (info: any) => {
        console.log(info);
      }

      this.pagedRouteModel.tableConfig.actionColWidth = '150px';
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    let loaderContainer: HTMLElement| null = document.getElementById('LoadingScreen');

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
        this.changeDetector.detectChanges();
        setTimeout(() => {
          if(loaderContainer){
            loaderContainer.classList.remove('d-block');
            loaderContainer.classList.add('d-none');
          }
        }, 1.5 * 1000);
      });
  }
}
