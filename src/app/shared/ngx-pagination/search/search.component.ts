import { Component, Input } from '@angular/core';
import { ISearchModel } from '../Models/ISearchModel';

@Component({
  selector: 'ngx-paged-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() searchModel: ISearchModel;

  constructor() {
    this.searchModel = {
      inputFieldPlaceholder: '',
      searchString: null,
      searchButtonLabel: null,
      showSearchIcon: true
    };
  }
}
