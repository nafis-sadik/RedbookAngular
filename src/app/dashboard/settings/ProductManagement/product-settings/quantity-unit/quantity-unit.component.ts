import { Component } from '@angular/core';
import { ICommonAttribute } from 'src/app/dashboard/Models/ICommonAttribute';

@Component({
  selector: 'app-quantity-unit',
  templateUrl: './quantity-unit.component.html',
  styleUrls: ['./quantity-unit.component.scss']
})
export class QuantityUnitComponent {
  quantityUnits: Array<ICommonAttribute>;
  selectedUnit: ICommonAttribute;

  constructor(){
    this.selectedUnit = {
      attributeId: 0,
      attributeName: '',
      attributeType: ''
    }
    this.quantityUnits = [
      {
        attributeId: 1,
        attributeName: 'Piece',
        attributeType: 'Quantity'
      },
      {
        attributeId: 2,
        attributeName: 'Kg',
        attributeType: 'Quantity'
      },
      {
        attributeId: 3,
        attributeName: 'Liter',
        attributeType: 'Quantity'
      },
      {
        attributeId: 4,
        attributeName: 'Gallon',
        attributeType: 'Quantity'
      }
    ];
  }
}
