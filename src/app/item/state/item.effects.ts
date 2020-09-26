import { Injectable, NgModule } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { ItemService } from '../services/item.service';
import * as fromItems from './../state/item.actions';
import { Item } from '../models/item.model';
import { getUser } from 'src/app/auth/store/auth.selectors';
import { AppState } from 'src/app/reducers';
import { ItemsActionTypes } from './../state/item.actions';

@Injectable()
export class ItemEffect {
  constructor(
    private actions$: Actions,
    private itemService: ItemService,
    private store: Store<AppState>
  ) {}

  @Effect()
  query$ = this.actions$.pipe(
    ofType(ItemsActionTypes.ITEMS_QUERY),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([, user]: any) => {
      return this.itemService.get(user.uid).pipe(
        map((data: any) => {
          const itemsData: Item[] = data.map((res: any) => {
            const key = res.payload.key;
            const item: Item = res.payload.val();
            return {
              key: key || null,
              itemName: item.itemName || null,
              isActive: item.isActive || null,
              dateCreated: item.dateCreated || null,
              dateModified: item.dateModified || null,
            };
          });
          return new fromItems.ItemsLoaded({ items: itemsData });
        }),
        catchError((error) => of(new fromItems.ItemsError({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  added$ = this.actions$.pipe(
    ofType(ItemsActionTypes.ITEM_ADDED),
    map((action: fromItems.ItemAdded) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.itemService.addItem(payload.item, user.uid)
    )
  );

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType(ItemsActionTypes.ITEM_DELETED),
    map((action: fromItems.ItemDeleted) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.itemService.delete(payload.item, user.uid)
    )
  );

  @Effect({ dispatch: false })
  edit$ = this.actions$.pipe(
    ofType(ItemsActionTypes.ITEM_EDITED),
    map((action: fromItems.ItemEdited) => action.payload),
    withLatestFrom(this.store.pipe(select(getUser))),
    switchMap(([payload, user]: any) =>
      this.itemService.update(payload.item, user.uid)
    )
  );

  /* @Effect()
  loadItems$: Observable<Action> = this.actions$.pipe(
    ofType<itemActions.LoadItems>(ItemsActionTypes.LOAD_ITEMS),
    mergeMap((action: itemActions.LoadItems) =>
      this.itemService.getItems().pipe(
        map((items: Item[]) => new itemActions.LoadItemsSuccess(items)),
        catchError((err) => of(new itemActions.LoadItemsFail(err)))
      )
    )
  );

  @Effect()
  loadItem$: Observable<Action> = this.actions$.pipe(
    ofType<itemActions.LoadItem>(itemActions.ItemActionTypes.LOAD_ITEM),
    mergeMap((action: itemActions.LoadItem) =>
      this.itemService.getItemById(action.payload).pipe(
        map((item: Item) => new itemActions.LoadItemSuccess(item)),
        catchError((err) => of(new itemActions.LoadItemFail(err)))
      )
    )
  );

  @Effect()
  createItem$: Observable<Action> = this.actions$.pipe(
    ofType<itemActions.CreateItem>(itemActions.ItemActionTypes.CREATE_ITEM),
    map((action: itemActions.CreateItem) => action.payload),
    mergeMap((item: Item) =>
      this.itemService.addItem(item).pipe(
        map((newItem: Item) => new itemActions.CreateItemSuccess(newItem)),
        catchError((err) => of(new itemActions.CreateItemFail(err)))
      )
    )
  );

  @Effect()
  updateItem$: Observable<Action> = this.actions$.pipe(
    ofType<itemActions.UpdateItem>(itemActions.ItemActionTypes.UPDATE_ITEM),
    map((action: itemActions.UpdateItem) => action.payload),
    mergeMap((item: Item) =>
      this.itemService.updateItem(item).pipe(
        map(
          (updatedItem: Item) =>
            new itemActions.UpdateItemSuccess({
              id: updatedItem.id,
              changes: updatedItem,
            })
        ),
        catchError((err) => of(new itemActions.UpdateItemFail(err)))
      )
    )
  );

  @Effect()
  deleteItem$: Observable<Action> = this.actions$.pipe(
    ofType<itemActions.DeleteItem>(itemActions.ItemActionTypes.DELETE_ITEM),
    map((action: itemActions.DeleteItem) => action.payload),
    mergeMap((id: string) =>
      this.itemService.deleteItem(id).pipe(
        map(() => new itemActions.DeleteItemSuccess(id)),
        catchError((err) => of(new itemActions.DeleteItemFail(err)))
      )
    )
  );
  @Effect()
  activateItem$: Observable<Action> = this.actions$.pipe(
    ofType<itemActions.ActivateItem>(itemActions.ItemActionTypes.ACTIVATE_ITEM),
    map((action: itemActions.ActivateItem) => action.payload),
    mergeMap((item: Item) =>
      this.itemService.updateItem(item).pipe(
        map(
          (updatedItem: Item) =>
            new itemActions.UpdateItemSuccess({
              id: updatedItem.id,
              changes: updatedItem,
            })
        ),
        catchError((err) => of(new itemActions.UpdateItemFail(err)))
      )
    )
  ); */
}
