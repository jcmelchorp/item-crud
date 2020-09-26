import { getIsLoading } from './../../auth/store/auth.selectors';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { Item } from '../models/item.model';
import { getAllLoaded, getItems } from '../state/item.selectors';
import * as fromItems from '../state/item.actions';

import { map } from 'rxjs/operators';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  items$: Observable<Item[]>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private afAuth: AngularFireAuth
  ) {}
  ngOnInit(): void {
    this.isLoading$ = this.store.select(getIsLoading);
    this.items$ = this.store.pipe(
      select(getItems),
      map((items: Item[]) => {
        if (this.user && !items) {
          this.store.dispatch(new fromItems.ItemsQuery());
        }
        return items;
      })
    );
  }
  get user() {
    return this.afAuth.currentUser;
  }
  onItemEdited(item: Item) {}
}
