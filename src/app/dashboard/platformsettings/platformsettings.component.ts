import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { RouteFormComponent } from './route-form/route-form.component';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { RouteService } from '../services/route.service';
import { NGXPaginationService } from 'src/app/shared/ngx-pagination/ngx-pagination.service';
import { RouteModel } from '../Models/route.model';
import { IParamModel } from 'src/app/shared/ngx-pagination/Models/IParamModel';
import { IPaginationModel } from 'src/app/shared/ngx-pagination/Models/IPaginationModel';

@Component({
  selector: 'app-platformsettings',
  templateUrl: './platformsettings.component.html',
  styleUrls: ['./platformsettings.component.scss']
})
export class PlatformsettingsComponent {
}
