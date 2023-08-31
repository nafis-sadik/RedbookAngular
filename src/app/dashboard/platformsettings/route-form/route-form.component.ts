import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { RouteService } from '../../services/route.service';
import { IRouteModel } from '../../Models/IRouteModel';
import { IApplicationModel } from '../../Models/IApplicationModel';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss']
})
export class RouteFormComponent implements OnInit {
  routeForm: FormGroup;
  routeModel: IRouteModel;
  appList: Array<IApplicationModel>;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private routeService: RouteService
  ){}

  ngOnInit(): void {
    this.routeForm = this.fb.group({
      routeName: ['', Validators.required],
      routeValue: ['', Validators.required],
      applicationId: ['', Validators.required],
      routeDescription: ['', Validators.required]
    });

    this.routeForm.valueChanges.subscribe(value => {
      console.log(value);
      this.routeModel = value;
    });
    
    this.appService.getAllApplications().subscribe(value => {
      console.log(value);
      this.appList = value;
    })
  }

  saveRoute(): void{
    if(this.routeModel == undefined)
      return

    if(this.routeModel.id == undefined || this.routeModel.id == null || this.routeModel.id <= 0){
      this.routeService.addNewRoute(this.routeModel)
    } else {
      this.routeService.updateNewRoute(this.routeModel)
    }
  }
}
