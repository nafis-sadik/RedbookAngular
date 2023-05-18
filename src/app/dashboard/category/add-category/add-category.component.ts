import { Component, Optional } from '@angular/core';
import { NbToastrService, NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'app-add-category',
  template: `
    <section id="AddCategoryComponent" class="container">
      <div class="row">
          <input nbInput type="text" placeholder="Title" class="col-md-7" #title>
          <button nbButton status="success" class="col-md-2" nbTooltip="Save" nbTooltipStatus="primary"
                  (click)="submit(title.value)">
              <nb-icon icon="checkmark"></nb-icon>
          </button>
          <button nbButton status="danger" class="col-md-2" nbTooltip="Cancel" nbTooltipStatus="danger"
                  (click)="cancel()">
              <nb-icon icon="close"></nb-icon>
          </button>
      </div>
    </section>
  `,
  styles: [`
     #AddCategoryComponent .row{
        justify-content: space-between;
        align-items: center;
    }
  `],
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
