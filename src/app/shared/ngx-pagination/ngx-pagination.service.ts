import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPaginationModel } from './Models/IPaginationModel';

@Injectable({
  providedIn: 'root'
})
export class NGXPaginationService<T> {
  private subject = new BehaviorSubject<IPaginationModel<T>>({
    allowAdd: false,
    allowSearch: false,
    sourceData: [],
    tableCardHeader: '',
    addNewElementButtonConfig: {
      showIcon: false,
      buttonLabel: '',
      onClick: null
    },
    pagingConfig: {
      pageNumber: 0,
      pageLengthOptions: [],
      pageLength: 5,
      totalItems: 0,
      onChange: null
    },
    searchingConfig: {
      buttonLabel: '',
      inputFieldPlaceholder: '',
      searchString: '',
      showIcon: false,
      onClick: null
    },
    tableConfig: {
      allowDelete: false,
      allowEdit: false,
      isEditableTable: false,
      tableMaping: { "": "" }
    }
  });

  get() { return this.subject.asObservable(); }

  set(newModel: IPaginationModel<T>) { this.subject.next(newModel); }
}
