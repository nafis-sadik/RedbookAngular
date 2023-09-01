import { Component, Input, OnInit } from '@angular/core';
import { IPaginationModel } from './Models/IPaginationModel';
import { ITableModel } from './Models/ITableModel';
import { IPagingModel } from './Models/IPagingModel';
import { ISearchModel } from './Models/ISearchModel';
import { IAddNewModel } from './Models/IAddNewModel';
import { NGXPaginationService } from './ngx-pagination.service';

@Component({
  selector: 'ngx-pagination',
  templateUrl: './ngx-pagination.component.html',
  styleUrls: ['./ngx-pagination.component.scss'],
})
export class NgxPaginationComponent<T> {
  @Input() paginationModel: IPaginationModel<T>;

  cardHeader: string;
  tableConfig: ITableModel;
  pagingModel: IPagingModel;
  searchModel: ISearchModel;
  addNewButtonConfig: IAddNewModel;

  constructor(ngxPaginationService: NGXPaginationService<T>) {
    ngxPaginationService.get().subscribe(updatedModel => {
      this.paginationModel = updatedModel;
      this.loadData();
    });
  }

  loadData(): void {
    if (!this.paginationModel)
      throw new Error('Object of type IPaginationModel is expected for paginationModel.');

    // Load table config to render
    if (this.paginationModel.tableConfig != null) {
      // Works for the table
      // Get column labels for table UI
      let collumnLabels: string[] = Object.keys(
        this.paginationModel.tableConfig.tableMaping,
      );

      // Get variable names from dynamic type T view model for mapping
      // As we are running the loop on label names and extracting the variable names from label and variable mapping,
      // We shall get the variable names in the correct sequence (the sequence of table column label)
      let variableNames: any[] = [];
      collumnLabels.forEach(label => {
        variableNames.push(this.paginationModel?.tableConfig?.tableMaping[label]);
      });

      // Here we filter the source data for UI
      let sourceData: Array<Array<any>> = [];
      this.paginationModel.tableConfig.sourceData.forEach((element) => {
        let elementKeyValuePair: string[] = [];
        Object.getOwnPropertyNames(element).forEach((val: string, idx, array) => {
            if (variableNames.includes(val)) {
              elementKeyValuePair[variableNames.indexOf(val)] = (
                element as any
              )[val];
            }
          },
        );
        sourceData.push(elementKeyValuePair);
      });

      // Load table config to render
      this.tableConfig = {
        columnNames: collumnLabels,
        sourceData: sourceData,
        onDelete: this.paginationModel.tableConfig.onDelete,
        onEdit: this.paginationModel.tableConfig.onEdit,
        onView: this.paginationModel.tableConfig.onView,
        actionColWidth: this.paginationModel.tableConfig.actionColWidth == null? '100px': this.paginationModel.tableConfig.actionColWidth
      };
    }

    // Load pagination config to render
    if (this.paginationModel.pagingConfig) {
      this.pagingModel = {
        pageLength: this.paginationModel.pagingConfig.pageLength,
        pageNumber: this.paginationModel.pagingConfig.pageNumber,
        totalItems: this.paginationModel.pagingConfig.totalItems,
        onUpdate: this.paginationModel.pagingConfig.onUpdate,
        totalPageCount:  Math.ceil(this.paginationModel.pagingConfig.totalItems/this.paginationModel.pagingConfig.pageLength)
      }
    }

    // Load search field config to render
    if (this.paginationModel.searchingConfig)
      this.searchModel = {
        inputFieldPlaceholder: this.paginationModel.searchingConfig.inputFieldPlaceholder? this.paginationModel.searchingConfig.inputFieldPlaceholder: 'Search',
        searchString: this.paginationModel.searchingConfig.searchString,
        searchButtonLabel: this.paginationModel.searchingConfig.buttonLabel,
        showSearchIcon: this.paginationModel.searchingConfig.showIcon,
        onClick: this.paginationModel.searchingConfig.onSearch,
      };

    // Load add new button config to render
    if (this.paginationModel.addNewElementButtonConfig != null)
      this.addNewButtonConfig = {
        addNewButtonLabel: this.paginationModel.addNewElementButtonConfig.buttonLabel,
        showIcon: this.paginationModel.addNewElementButtonConfig.showIcon,
        onClick: this.paginationModel.addNewElementButtonConfig.onAdd,
      };
  }
}
