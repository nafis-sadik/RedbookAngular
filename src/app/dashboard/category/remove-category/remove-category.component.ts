import { Component, Optional } from '@angular/core';
import { NbToastrService, NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'app-remove-category',
  template: `
    <section id="RemoveCategory">
      <div class="row">
        <p>The operation you are attempting to execute is irreversible.</p>
        <p>Are you certain that you intend to proceed?</p>
      </div>
      <div class="buttons">
          <div class="row">
              <button nbButton status="success" class="col-md-2" nbTooltip="Cancel" nbTooltipStatus="primary"
                      (click)="submit(false)">
                  <nb-icon icon="close"></nb-icon>
              </button>
              <div class="col-md-8"></div>
              <button nbButton status="danger" class="col-md-2" nbTooltip="Save" nbTooltipStatus="danger"
                      (click)="submit(true)">
                  <nb-icon icon="checkmark"></nb-icon>
              </button>
          </div>
      </div>
    </section>
  `
})
export class RemoveCategoryComponent {
  constructor(@Optional() private ref: NbWindowRef<RemoveCategoryComponent>, private toastrService: NbToastrService) { }
  
  submit(deleteEntry: boolean) {
    this.ref.close(deleteEntry);    
  }
}
