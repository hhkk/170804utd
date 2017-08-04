import { Component } from '@angular/core';
import { PaginationService } from 'ng2-pagination';
import { Utds2List } from "../../../shared-components/utds2-list.class";

//import template from './utds2-list.component.html';
import template from './utds2-list.component.html';
import style from './utds2-list.component.scss';

@Component({
  selector: 'utds-listxxx',
  template,
  styles: [ style ]
})
export class Utds2ListComponent extends Utds2List {
  constructor(paginationService: PaginationService) {
    super(paginationService);
  }
}
