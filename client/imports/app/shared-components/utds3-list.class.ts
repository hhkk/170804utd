import {OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription, Subject} from "rxjs";
import {Utd3} from "../../../../both/models/utd3.model";
import {PaginationService} from "ng2-pagination";
import {MeteorObservable} from "meteor-rxjs";
import {Utds3} from "../../../../both/collections/utds3.collection";
import {Counts} from "meteor/tmeasday:publish-counts";
import {InjectUser} from "angular2-meteor-accounts-ui";

interface Pagination {
  limit: number;
  skip: number;
}

interface Options extends Pagination {
  [key: string]: any
}

@InjectUser('user')
export class Utds3List implements OnInit, OnDestroy {
  utdsxx2: Observable<Utd3[]>;
  utdsSub: Subscription;
  pageSize: Subject<number> = new Subject<number>();
  curPage: Subject<number> = new Subject<number>();
  nameOrder: Subject<number> = new Subject<number>();
  optionsSub: Subscription;
  utdsSize: number = 0;
  autorunSub: Subscription;
  location: Subject<string> = new Subject<string>();
  user: Meteor.User;
  imagesSubs: Subscription;

  constructor(private paginationService: PaginationService) {

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
        sort: { name: nameOrder as number }
      };

      this.paginationService.setCurrentPage(this.paginationService.defaultId, curPage as number);

      if (this.utdsSub) {
        this.utdsSub.unsubscribe();
      }

      this.utdsSub = MeteorObservable.subscribe('utds3ahbkpubname', options, location).subscribe(() => {
        console.log(' ========================== running utds2 sub');
        this.utdsxx2 = Utds3.find({}, {
          sort: {
            name: nameOrder
          }
        }).zone();
      });
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
  }

  removeUtd(utd: Utd3): void {
    Utds3.remove(utd._id);
  }

  search(value: string): void {
    this.curPage.next(1);
    this.location.next(value);
  }

  onPageChanged(page: number): void {
    this.curPage.next(page);
  }

  changeSortOrder(nameOrder: string): void {
    this.nameOrder.next(parseInt(nameOrder));
  }

  isOwner(utd: Utd3): boolean {
    return this.user && this.user._id === utd.owner;
  }

  ngOnDestroy() {
    this.utdsSub.unsubscribe();
    this.optionsSub.unsubscribe();
    this.autorunSub.unsubscribe();
    this.imagesSubs.unsubscribe();
  }
}