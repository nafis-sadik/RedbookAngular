import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRouteModel } from '../Models/IRouteModel';
import { AppService } from '../services/app.service';
import { IApplicationModel } from '../Models/IApplicationModel';

@Component({
  selector: 'app-platformsettings',
  templateUrl: './platformsettings.component.html',
  styleUrls: ['./platformsettings.component.scss']
})
export class PlatformsettingsComponent implements OnInit {
  routeForm: FormGroup;
  routeModel: IRouteModel;
  appList: Array<IApplicationModel>;
  
  constructor(
    private fb: FormBuilder,
    private appService: AppService
  ){ }

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
    
    this.appService.getAllApplications().subscribe((value) => {
      console.log(value);
      this.appList = value;
    })
  }

  saveRoute(): void{
    console.log('routeModel', this.routeModel.id)
    // this.appService.
  }
}
