import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-products-details-form',
  templateUrl: './products-details-form.component.html',
  styleUrls: ['./products-details-form.component.scss']
})
export class ProductsDetailsFormComponent {
  @Input() isUpdateOperation: boolean = false;
}
