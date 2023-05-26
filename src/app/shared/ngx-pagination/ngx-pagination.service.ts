import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPaginationModel } from './Models/IPaginationModel';

@Injectable({
  providedIn: 'root'
})
export class NGXPaginationService<T> {
  private data = new BehaviorSubject<IPaginationModel<T>>({
    allowAdd: true,
    allowSearch: true,
    sourceData: [],
    tableCardHeader: '',
    addNewElementButtonConfig: {
      showIcon: true,
      buttonLabel: '',
      onClick: null
    },
    pagingConfig: {
      pageNumber: 0,
      pageLengthOptions: [1],
      pageLength: 5,
      totalItems: 0,
      onChange: null
    },
    searchingConfig: {
      buttonLabel: '',
      inputFieldPlaceholder: '',
      searchString: '',
      showIcon: true,
      onClick: null
    },
    tableConfig: {
      allowDelete: true,
      allowEdit: true,
      isEditableTable: true,
      tableMaping: { "": "" }
    }
  });

  getData() {
    return this.data.asObservable();
  }

  updateData(newData: IPaginationModel<T>) {
    this.data.next(newData);
  }
}
