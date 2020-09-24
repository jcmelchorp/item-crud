import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import * as itemActions from '../state/item.actions';

@Injectable()
export class ItemEffect {
  constructor(private actions$: Actions, private itemService: ItemService) {}

  @Effect()
  loadItems$: Observable<Action> = this.actions$.pipe(
    ofType<itemActions.LoadItems>(itemActions.ItemActionTypes.LOAD_ITEMS),
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
      this.itemService.createItem(item).pipe(
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
  );
}
