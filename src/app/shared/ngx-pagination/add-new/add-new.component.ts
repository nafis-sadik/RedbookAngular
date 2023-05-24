import { Component, Input } from '@angular/core';
import { IAddNewModel } from '../Models/IAddNewModel';

@Component({
  selector: 'ngx-paged-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent {
  @Input() addNewModel: IAddNewModel;

  constructor() {
    this.addNewModel = {
      showIcon: true,
      addNewButtonLabel: null,
      onClick: null
    }
  }

  addNew(): void{
    if(this.addNewModel.onClick != null && typeof(this.addNewModel.onClick) == typeof(Function))
      this.addNewModel.onClick();
  }
}
