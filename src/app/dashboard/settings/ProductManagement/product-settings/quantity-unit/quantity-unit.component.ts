import { Component, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { ICommonAttribute } from 'src/app/dashboard/Models/ICommonAttribute';
import { CommonAttributeService } from 'src/app/dashboard/services/common-attribute.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-quantity-unit',
  templateUrl: './quantity-unit.component.html',
  styleUrls: ['./quantity-unit.component.scss']
})
/**
 * QuantityUnitComponent handles managing quantity units and brands.
 * 
 * It receives the list of quantity units and brands as inputs. 
 * It has methods to select a unit/brand, save changes to the API,
 * and reset the selection.
 * 
 * The component coordinates updating the selection, calling the API,
 * and updating the UI list when data changes.
 */
export class QuantityUnitComponent {
  @Input() quantityUnits: Array<ICommonAttribute>;
  @Input() brands: Array<ICommonAttribute>;
  selectedUnit: ICommonAttribute;
  selectedBrand: ICommonAttribute;

  constructor(private commonAttributeService: CommonAttributeService, private toasterService: NbToastrService) {
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
      if (element == targetListItem) {
        // Add active class to selected list item
        element.classList.add('active');
        return;
      }
    });

    if (containerId == environment.attributeTypes.brands) {
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
    if (this.selectedUnit.attributeName == ''){
      this.toasterService.danger('Please enter a name for the attribute or select the one you want to update', 'Error');
      return;
    }

    // Update UI & prepare object for request
    let selectedAttr: ICommonAttribute;
    let attrList: Array<ICommonAttribute>;
    if (containerId == environment.attributeTypes.quantity) {
      // Save Quantity Unit
      selectedAttr = this.selectedUnit;
      selectedAttr.attributeType = environment.attributeTypes.quantity;

      attrList = this.quantityUnits;

      // Reset the form
      this.selectedUnit = {
        attributeId: 0,
        attributeName: '',
        attributeType: ''
      };
    } else {
      // Save Brand
      selectedAttr = this.selectedBrand;
      selectedAttr.attributeType = environment.attributeTypes.brands;

      attrList = this.quantityUnits;

      // Reset the form
      this.selectedBrand = {
        attributeId: 0,
        attributeName: '',
        attributeType: ''
      };
    }

    // Send the HTTP request
    let event: Observable<ICommonAttribute>;
    if (this.selectedUnit.attributeId == 0) {
      event = this.commonAttributeService.addNewAttribute(selectedAttr);
    } else {
      event = this.commonAttributeService.updateExistingAttribute(selectedAttr);
    }

    // Process HTTP response
    event.subscribe((quantity: ICommonAttribute) => {
      // Update the list in UI
      let targetQuantity = attrList.filter(unit => unit.attributeId == quantity.attributeId);
      if (targetQuantity.length > 0) {  // For update operation
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

    if (containerId == environment.attributeTypes.brands) {
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
