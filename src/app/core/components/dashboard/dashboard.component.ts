import { BoardService } from './../../../board/services/board.service';
import { ItemService } from './../../../item/services/item.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, empty } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { getUser } from 'src/app/auth/store/auth.selectors';
import { Item } from 'src/app/item/models/item.model';
import { Board } from 'src/app/board/models/board.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  itemSub: Subscription;

  boardSub: Subscription;

  constructor(
    private store: Store<AppState>,
    private itemService: ItemService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.initItems();
    this.initBoards();
  }

  ngOnDestroy(): void {
    if (this.itemSub) {
      this.itemSub.unsubscribe();
    }

    if (this.boardSub) {
      this.boardSub.unsubscribe();
    }
  }

  initItems() {
    this.itemSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.itemService.getAll(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe((items) => {
        if (items.length === 0) {
          //this.itemService.addItems(this.items);
        }
      });
  }

  initBoards() {
    this.boardSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.boardService.getAll(/* user.uid */);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe((board) => {
        if (board.length === 0) {
          //this.boardService.addCustomers(this.board);
        }
      });
  }
}
