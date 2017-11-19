import {OnDestroy, OnInit} from "@angular/core";
// import {Input, OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription, Subject} from "rxjs";
//import {Utd4} from "../../../../both/models/utd4.model";
import {PaginationService} from "ng2-pagination";
import {MeteorObservable} from "meteor-rxjs";
//import {Utds4} from "../../../../both/collections/utds4.collection";
import {Utds42} from "../../../../both/collections/utds42.collection";
import {Counts} from "meteor/tmeasday:publish-counts";
import {InjectUser} from "angular2-meteor-accounts-ui";
import { UtilLog } from "../../../../both/utlities/UtilLog";
import { UtdEnum } from "../../../../both/utlities/UtdEnum";
import {Utd42} from "../../../../both/models/utd42.model";
//import {Utds4FormComponent} from "../obj/utds4/form/utds4-form.component";

//import {Utds4} from "../../../../both/collections/utds4.collection";

interface Pagination {
    limit: number;
    skip: number;
}

interface Options extends Pagination {
    [key: string]: any
}

@InjectUser('user')
export class Utds42List implements OnInit, OnDestroy {
    utdsxx2_42: Observable<Utd42[]>;
    utdsSub: Subscription;
    userDatahbkSub: Subscription;
    // Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast
    pageSize:  Subject<number> = new Subject<number>();
    curPage:   Subject<number> = new Subject<number>();
    nameOrder: Subject<number> = new Subject<number>();
    location:  Subject<string> = new Subject<string>();
    currentSearchString1:  string;
    constructedTime:  string;
    currentSearchString:  Subject<string> = new Subject<string>();
    optionsSub: Subscription;
    utdsSize: number = 0;
    autorunSub: Subscription;
    user: Meteor.User;
    imagesSubs: Subscription;

    //1
    // @Input() xxxx: Utds4FormComponent;   // hbkhbk


    constructor(private paginationService: PaginationService) {
        //alert('in paginationService');
        this.currentSearchString1 = 's1';
        this.constructedTime = new Date().toString();
        window.xxxglobalUtds42List = this;
        //alert ('in Utds42List constructor, this.constructedTime:' + window.xxxglobalUtds42List.constructedTime);
    }

    ngOnInit() {
        this.imagesSubs = MeteorObservable.subscribe('images').subscribe();

        this.optionsSub = Observable.combineLatest(
            this.pageSize,
            this.curPage,
            this.nameOrder,
            this.location
        ).subscribe(([pageSize, curPage, nameOrder, location]) => {
            const options: Options = {
                limit: pageSize as number,
                skip: ((curPage as number) - 1) * (pageSize as number),
                sort: {filelineraw: nameOrder as number}
            };

            this.paginationService.setCurrentPage(this.paginationService.defaultId, curPage as number);

            if (this.utdsSub) {
                this.utdsSub.unsubscribe();
            }

            // this CLIENT file connects to/calls file /Users/hkon/utd/170804utd/server/imports/publications/utds42.ts
            // so a publication is called by a shared component in the pub-sub framework
            this.utdsSub = MeteorObservable.subscribe('utdbase', options, location).subscribe(() => {
                UtilLog.log(' hbkhbk ===== client side utds42 subscriber  ========================== ');

                // works this.utdsxx2_42 = Utds42.find({text:/.*hbk.*/}, {
                this.utdsxx2_42 = Utds42.find({}, {
                    sort: {
                        // works text: 1
                        text: 1
                        // works filelineraw: -1
                    }
                }).zone();
            });

            // this.userDatahbkSub = MeteorObservable.subscribe('userDatahbk', options, location).subscribe(() => {
            //      UtilLog.log(' hbkhbk ===== client side utds42 subscriber  ========================== ');
            //
            //      // works this.utdsxx2_42 = Utds42.find({text:/.*hbk.*/}, {
            //      this.utdsxx2_42 = Utds42.find({}, {
            //          sort: {
            //              // works text: 1
            //              // works filelineraw: -1
            //              filelineraw: -1
            //          }
            //      }).zone();
            //  });
        });

        this.paginationService.register({
            id: this.paginationService.defaultId,
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.utdsSize
        });

        this.pageSize.next(10);
        this.curPage.next(1);
        this.nameOrder.next(1);
        this.location.next('');

        this.autorunSub = MeteorObservable.autorun().subscribe(() => {
            this.utdsSize = Counts.get('numberOfUtds');
            this.paginationService.setTotalItems(this.paginationService.defaultId, this.utdsSize);
        });

        this.currentSearchString1 = 's0';

    }

    removeUtd(utd: Utd42): void {
        UtilLog.utdmLog("lookin good!!!!!!!!!!! ", UtdEnum.Severity.INFO);
        Utds42.remove(utd._id);
    }




    updateConstrTime(): void {
        this.constructedTime = (new Date()).toString();
    }








    searchutdbase(searchUtdBaseString: string): void {

        //searchUtdBaseString = 'ff';

        //alert('================ in searchutdbase ++++++++++++++++ :' + searchUtdBaseString);

        this.currentSearchString1 = searchUtdBaseString;

        UtilLog.utdmLog(" ================ in searchutdbase  :" + searchUtdBaseString , UtdEnum.Severity.INFO);

        this.currentSearchString.next(searchUtdBaseString);
        this.currentSearchString1 = searchUtdBaseString;

        setTimeout(() => { this.currentSearchString1 = searchUtdBaseString+'lllll';}, 2000)
        //setTimeout(() => { alert('hi mom!:'+this.currentSearchString1)}, 4000)
        //UtilLog.utdmLog("lookin good SEARCH !!!!!!!!!!! 1", UtdEnum.Severity.INFO);
        //let a = $location.search();
        UtilLog.utdmLog(" ================ slookin good SEARCH !!!!!!!!!!! 2:" + searchUtdBaseString , UtdEnum.Severity.INFO);

        this.curPage.next(1);
        this.location.next(searchUtdBaseString);
    }

    onPageChanged(page: number): void {
        this.curPage.next(page);
    }

    changeSortOrder(nameOrder: string): void {
        this.nameOrder.next(parseInt(nameOrder));
    }

    isOwner(utd: Utd42): boolean {
        return this.user && this.user._id === utd.owner;
    }

    ngOnDestroy() {
        this.utdsSub.unsubscribe();
        this.optionsSub.unsubscribe();
        this.autorunSub.unsubscribe();
        this.imagesSubs.unsubscribe();
    }
}