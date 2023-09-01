import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
  @Input() paginationModel: IPaginationModel<T> | undefined;

  cardHeader: string = '';
  tableConfig: ITableModel | null = null;
  pagingModel: IPagingModel | null = null;
  searchModel: ISearchModel | null = null;
  addNewButtonConfig: IAddNewModel | null = null;

  constructor(private ngxPaginationService: NGXPaginationService<T>) {
    this.ngxPaginationService.get().subscribe((updatedModel) => {
      this.paginationModel = updatedModel;
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    if (!this.paginationModel)
      throw new Error(
        'Object of type IPaginationModel is expected for paginationModel.',
      );

    this.cardHeader =
      this.paginationModel?.tableCardHeader == null
        ? ''
        : this.paginationModel.tableCardHeader;

    // Load table config to render
    if (this.paginationModel.tableConfig != null) {
      // Works for the table
      // Get column labels for ui tables
      let collumnLabels: string[] = Object.keys(
        this.paginationModel.tableConfig.tableMaping,
      );

      // Get variable names of dynamic type T from mapping
      // As we are running the loop on label names and extracting the variable names from label and variable mapping,
      // we shall get the variable names in the correct sequence (the sequence of table column label)
      let variableNames: any[] = [];
      collumnLabels.forEach((label) => {
        variableNames.push(
          this.paginationModel?.tableConfig?.tableMaping[label],
        );
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

      // Table column width set
      let colummWidth: string = '';
      if(this.paginationModel.tableConfig?.actionColWidth == ''
      || this.paginationModel.tableConfig?.actionColWidth == null)
        colummWidth == "100px";
      else
        colummWidth = this.paginationModel.tableConfig?.actionColWidth;
      // Load table config to render
      this.tableConfig = {
        isEditableTable: !this.paginationModel.tableConfig
          ? false
          : this.paginationModel.tableConfig?.isEditableTable,
        columnNames: collumnLabels,
        sourceData: sourceData,
        onDelete: this.paginationModel.tableConfig.onDelete,
        onEdit: this.paginationModel.tableConfig.onEdit,
        onView: this.paginationModel.tableConfig.onView,
        actionColWidth: colummWidth
      };

    }

    // Load pagination config to render
    if (this.paginationModel.pagingConfig) {
      // Works for paging
      let itemsPerPage: number =
        this.paginationModel.pagingConfig?.pageLengthOptions[
          this.paginationModel.pagingConfig.pageLength
        ];
      let totalItems: number = this.paginationModel.pagingConfig?.totalItems;
      let totalPageCount = Math.ceil(totalItems / itemsPerPage);
      // If no products found, there shall still always be page 1 as the page has loaded successfully
      totalPageCount = totalPageCount <= 0 ? 1 : totalPageCount;

      // Load paging config to render
      if(this.paginationModel.pagingConfig && this.paginationModel.pagingConfig.onChange)
        this.pagingModel = {
          pageNumber: this.paginationModel.pagingConfig.pageNumber,
          pageLength: this.paginationModel.pagingConfig.pageLength,
          pageLengthOptions: this.paginationModel.pagingConfig.pageLengthOptions,
          totalPageCount: totalPageCount,
          updateList: this.paginationModel.pagingConfig.onChange,
        };
    }

    // Load search field config to render
    if (this.paginationModel.searchingConfig)
      this.searchModel = {
        inputFieldPlaceholder:
          this.paginationModel.searchingConfig.inputFieldPlaceholder,
        searchString: this.paginationModel.searchingConfig.searchString,
        searchButtonLabel: this.paginationModel.searchingConfig.buttonLabel,
        showSearchIcon: this.paginationModel.searchingConfig.showIcon,
        onClick: this.paginationModel.searchingConfig.onClick,
      };

    // Load add new button config to render
    if (this.paginationModel.addNewElementButtonConfig != null)
      this.addNewButtonConfig = {
        addNewButtonLabel:
          this.paginationModel.addNewElementButtonConfig.buttonLabel,
        showIcon: this.paginationModel.addNewElementButtonConfig.showIcon,
        onClick: this.paginationModel.addNewElementButtonConfig.onClick,
      };

      // this.changeDetector.detectChanges();
  }
}
