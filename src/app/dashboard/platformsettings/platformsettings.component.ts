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
  pagedRouteModel: IPaginationModel<IRouteModel>;
  
  constructor(dashboardService: DashboardService, routeService: RouteService, changeDetector: ChangeDetectorRef, ngxPaginationService: NGXPaginationService<IRouteModel>){
    this.pagedRouteModel = dashboardService.getPagingConfig(RouteFormComponent, 'Routes', 'Add Route');

    routeService.getPagedRoute(this.pagedRouteModel)
      .subscribe(response => {
        console.log(response);
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

        ngxPaginationService.set(this.pagedRouteModel);
        changeDetector.detectChanges();
      });
    
    if(this.pagedRouteModel.tableConfig)
      this.pagedRouteModel.tableConfig.tableMaping = {
        "Route Name": "routeName",
        "Route": "routeValue",
        "Description": "description",
        "Application": "applicationName"
      }

   }

  ngOnInit(): void {
  }
}
