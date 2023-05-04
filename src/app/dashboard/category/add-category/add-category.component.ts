import { Component, Optional } from '@angular/core';
import { NbToastrService, NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  constructor(@Optional()  private ref: NbWindowRef<AddCategoryComponent>, private toastrService: NbToastrService) {}

  cancel() {
    this.ref.close();
  }

  submit(title: string) {
    if (title.length <= 0){
      this.toastrService.warning('Can not save empty title', 'Warning');
      return;
    }
    this.ref.close(title);
  }
}
