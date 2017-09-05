"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utds4_list_class_1 = require("../../../shared-components/utds4-list.class");
//import template from './utds4-list.component.html';
var utds4_list_component_html_1 = require("./utds4-list.component.html");
var utds4_list_component_scss_1 = require("./utds4-list.component.scss");
var Utds4ListComponent = (function (_super) {
    __extends(Utds4ListComponent, _super);
    function Utds4ListComponent(paginationService) {
        return _super.call(this, paginationService) || this;
    }
    Utds4ListComponent = __decorate([
        core_1.Component({
            selector: 'utds4-listxxx',
            template: utds4_list_component_html_1.default,
            styles: [utds4_list_component_scss_1.default]
        })
    ], Utds4ListComponent);
    return Utds4ListComponent;
}(utds4_list_class_1.Utds4List));
exports.Utds4ListComponent = Utds4ListComponent;
