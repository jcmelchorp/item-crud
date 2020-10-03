import { getIsLoading } from './../../auth/store/auth.selectors';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { Item } from '../models/item.model';
import { getAllLoaded, getItems } from '../store/item.selectors';
import * as fromItems from '../store/item.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  items$: Observable<Item[]>;
  error$: Observable<string>;
  loading$: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private afAuth: AngularFireAuth
  ) {}
  ngOnInit(): void {
    this.loading$ = this.store.select(getAllLoaded);
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
  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  get user() {
    return this.afAuth.currentUser;
  }
  onItemEdited(item: Item) {}
}
