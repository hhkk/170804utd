import { Component } from '@angular/core';
import { PaginationService } from 'ng2-pagination';
import { Utds42List } from "../../../shared-components/utds42-list.class";

//import template from './utds4-list.component.html';
import template from './utds4-list.component.html';
import style from './utds4-list.component.scss';

@Component({
  selector: 'utds4-listxxx',
  template,
  styles: [ style ]
})
export class Utds4ListComponent extends Utds42List {
//export class Utds4ListComponent extends Utds4List {
  constructor(paginationService: PaginationService) {
    super(paginationService);
  }
}
