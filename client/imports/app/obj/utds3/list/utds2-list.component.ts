import { Component } from '@angular/core';
import { PaginationService } from 'ng2-pagination';
import { Utds3List } from "../../../shared-components/utds3-list.class";

//import template from './utds3-list.component.html';
import template from './utds2-list.component.html';
import style from './utds2-list.component.scss';

@Component({
  selector: 'utds3-listxxx',
  template,
  styles: [ style ]
})
export class Utds3ListComponent extends Utds3List {
  constructor(paginationService: PaginationService) {
    super(paginationService);
  }
}
