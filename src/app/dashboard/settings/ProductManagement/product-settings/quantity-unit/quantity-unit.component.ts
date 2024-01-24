import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommonAttribute } from 'src/app/dashboard/Models/ICommonAttribute';
import { CommonAttributeService } from 'src/app/dashboard/services/common-attribute.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-quantity-unit',
  templateUrl: './quantity-unit.component.html',
  styleUrls: ['./quantity-unit.component.scss']
})
export class QuantityUnitComponent {
  quantityUnits: Array<ICommonAttribute>;
  brands: Array<ICommonAttribute>;
  selectedUnit: ICommonAttribute;
  selectedBrand: ICommonAttribute;

  constructor(private commonAttributeService: CommonAttributeService) {
    this.selectedUnit = {
      attributeId: 0,
      attributeName: '',
      attributeType: ''
    }
    this.selectedBrand = {
      attributeId: 0,
      attributeName: '',
      attributeType: ''
    }
    this.commonAttributeService.getAttributes(environment.attributeTypes.quantity)
    .subscribe(
      (response: Array<ICommonAttribute>) => {
        this.quantityUnits = response;
      }
    );
    this.commonAttributeService.getAttributes(environment.attributeTypes.brands)
    .subscribe(
      (response: Array<ICommonAttribute>) => {
        this.brands = response;
      }
    );
  }
  
  selectedAttribute(attrId: number, event: any, containerId: string): void {
    let listItems = document.querySelectorAll(`#${containerId} nb-list-item`);

    let currentNode = event.target;
    let targetListItem: Element;
    
    while (currentNode) {  
      // Found section parent
      if (currentNode.tagName === 'NB-LIST-ITEM') {
        targetListItem = currentNode;
        break;
      }
  
      // Go up to parent node
      currentNode = currentNode.parentElement; 
    }
    
    listItems.forEach(element => {
      // Remove active class from every list item
      element.classList.remove('active');
      if(element == targetListItem) {
        // Add active class to selected list item
        element.classList.add('active');
        return;
      }
    });

    if(containerId == environment.attributeTypes.brands) {
      // Selects the clicked brand from the list
      for (let brand of this.brands) {
        if (brand.attributeId == attrId) {
          this.selectedBrand = brand;
          break;
        }
      }
    } else {
      // Selects the clicked unit from the list
      for (let unit of this.quantityUnits) {
        if (unit.attributeId == attrId) {
          this.selectedUnit = unit;
          break;
        }
      }
    }
  }

  saveAttribute(containerId: string): void {
    if(containerId == environment.attributeTypes.quantity) {
      // Save Quantity Unit
      this.attrSaveAPIConsumer(this.selectedUnit, this.quantityUnits);

      // Reset the form
      this.selectedUnit = {
        attributeId: 0,
        attributeName: '',
        attributeType: ''
      };
    } else {
      // Save Brand
      this.attrSaveAPIConsumer(this.selectedBrand, this.brands);

      // Reset the form
      this.selectedBrand = {
        attributeId: 0,
        attributeName: '',
        attributeType: ''
      };
    }
  }

  attrSaveAPIConsumer(selectedAttr: ICommonAttribute, attrList: ICommonAttribute[]): void {
    let event: Observable<ICommonAttribute>;
    if(selectedAttr.attributeName == '') return;

    if(this.selectedUnit.attributeId == 0){
      event = this.commonAttributeService.addNewAttribute(this.selectedUnit);
    } else {
      event = this.commonAttributeService.updateExistingAttribute(this.selectedUnit);
    }

    event.subscribe((quantity: ICommonAttribute) => {
      // Update the list in UI
      let targetQuantity = attrList.filter(unit => unit.attributeId == quantity.attributeId);
      if(targetQuantity.length > 0){  // For update operation
        targetQuantity[0].attributeId = quantity.attributeId;
        targetQuantity[0].attributeName = quantity.attributeName;
        targetQuantity[0].attributeType = quantity.attributeType;
      } else {                         // For add operation
        attrList.push(quantity);
      }
    });
  }

  resetAttribute(containerId: string): void {
    let listItems = document.querySelectorAll(`#${containerId} nb-list-item`);

    listItems.forEach(element => {
      // Remove active class from every list item
      element.classList.remove('active');
    });

    if(containerId == environment.attributeTypes.brands) {
      this.selectedUnit = {
        attributeId: 0,
        attributeName: '',
        attributeType: ''
      }
    } else {
      this.selectedBrand = {
        attributeId: 0,
        attributeName: '',
        attributeType: ''
      }
    }
  }
}
