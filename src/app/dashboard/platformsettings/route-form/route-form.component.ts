import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { RouteService } from '../../services/route.service';
import { IRouteModel } from '../../Models/IRouteModel';
import { IApplicationModel } from '../../Models/IApplicationModel';
import { NbToastrService } from '@nebular/theme';

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
    private routeService: RouteService,
    private toasterService: NbToastrService
  ){}

  ngOnInit(): void {
    this.routeForm = this.fb.group({
      routeName: ['', Validators.required],
      routeValue: ['', Validators.required],
      applicationId: ['', Validators.required],
      description: ['', Validators.required]
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
    
    let loaderContainer: HTMLElement| null = document.getElementById('LoadingScreen');
    if(loaderContainer){
      loaderContainer.classList.add('d-block');
      loaderContainer.classList.remove('d-none');
    }
    
    if(this.routeModel.id == undefined || this.routeModel.id == null || this.routeModel.id <= 0){
      this.routeService.addNewRoute(this.routeModel)
      .subscribe(
        (response) => {
          window.location.reload();
        },
        (err) => {
          this.toasterService.danger(err.error, 'Failed to execute operation');
          
          if(loaderContainer){
            loaderContainer.classList.remove('d-block');
            loaderContainer.classList.add('d-none');
          }
        })
    } else {
      this.routeService.updateNewRoute(this.routeModel);
    }
  }
}
