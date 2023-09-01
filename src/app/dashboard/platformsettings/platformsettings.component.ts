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
  
  constructor(dashboardService: DashboardService, private routeService: RouteService, private changeDetector: ChangeDetectorRef, private ngxPaginationService: NGXPaginationService<IRouteModel>){
    this.pagedRouteModel = dashboardService.getPagingConfig(RouteFormComponent, 'Routes', 'Add Route');
    
    if(this.pagedRouteModel.tableConfig){      
      this.pagedRouteModel.tableConfig.tableMaping = {
        "Route Name": "routeName",
        "Route": "routeValue",
        "Description": "description",
        "Application": "applicationName"
      };

      this.pagedRouteModel.tableConfig.onEdit = (info: any) => {
        console.log(info);
      }
    }
   }

  ngOnInit(): void {
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
        setTimeout(() => {
          if(loaderContainer){
            loaderContainer.classList.remove('d-block');
            loaderContainer.classList.add('d-none');
          }
        }, 1.5 * 1000);
        this.changeDetector.detectChanges();
      });
    
  }
}
