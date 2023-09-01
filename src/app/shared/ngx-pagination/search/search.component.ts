import { Component, Input } from '@angular/core';
import { ISearchModel } from '../Models/ISearchModel';

@Component({
  selector: 'ngx-paged-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() searchModel: ISearchModel;

  search(): void {
    if (
      this.searchModel.onClick != null &&
      typeof this.searchModel.onClick == typeof Function
    )
      this.searchModel.onClick();
  }
}
