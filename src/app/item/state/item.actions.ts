import { Action } from '@ngrx/store';
import { Item } from '../models/item.model';
import { Update } from '@ngrx/entity';

export enum ItemActionTypes {
  LOAD_ITEMS = '[Item] Load Items',
  LOAD_ITEMS_SUCCESS = '[Item] Load Items Success',
  LOAD_ITEMS_FAIL = '[Item] Load Items Fail',
  LOAD_ITEM = '[Item] Load Item',
  LOAD_ITEM_SUCCESS = '[Item] Load Item Success',
  LOAD_ITEM_FAIL = '[Item] Load Item Fail',
  CREATE_ITEM = '[Item] Create Item',
  CREATE_ITEM_SUCCESS = '[Item] Create Item Success',
  CREATE_ITEM_FAIL = '[Item] Create Item Fail',
  UPDATE_ITEM = '[Item] Update Item',
  UPDATE_ITEM_SUCCESS = '[Item] Update Item Success',
  UPDATE_ITEM_FAIL = '[Item] Update Item Fail',
  DELETE_ITEM = '[Item] Delete Item',
  DELETE_ITEM_SUCCESS = '[Item] Delete Item Success',
  DELETE_ITEM_FAIL = '[Item] Delete Item Fail',
}
/* Create Items */
export class LoadItems implements Action {
  readonly type = ItemActionTypes.LOAD_ITEMS;
}
export class LoadItemsSuccess implements Action {
  readonly type = ItemActionTypes.LOAD_ITEMS_SUCCESS;
  constructor(public payload: Item[]) { }
}
export class LoadItemsFail implements Action {
  readonly type = ItemActionTypes.LOAD_ITEMS_FAIL;
  constructor(public payload: string) { }
}
/* Load Item */
export class LoadItem implements Action {
  readonly type = ItemActionTypes.LOAD_ITEM;
  constructor(public payload: string) { }
}
export class LoadItemSuccess implements Action {
  readonly type = ItemActionTypes.LOAD_ITEM_SUCCESS;
  constructor(public payload: Item) { }
}
export class LoadItemFail implements Action {
  readonly type = ItemActionTypes.LOAD_ITEM_FAIL;
  constructor(public payload: string) { }
}
/* Create Item */
export class CreateItem implements Action {
  readonly type = ItemActionTypes.CREATE_ITEM;
  constructor(public payload: Item) { }
}
export class CreateItemSuccess implements Action {
  readonly type = ItemActionTypes.CREATE_ITEM_SUCCESS;
  constructor(public payload: Item) { }
}
export class CreateItemFail implements Action {
  readonly type = ItemActionTypes.CREATE_ITEM_FAIL;
  constructor(public payload: string) { }
}
/* Update Item */
export class UpdateItem implements Action {
  readonly type = ItemActionTypes.UPDATE_ITEM;
  constructor(public payload: Item) { }
}
export class UpdateItemSuccess implements Action {
  readonly type = ItemActionTypes.UPDATE_ITEM_SUCCESS;
  constructor(public payload: Update<Item>) { }
}
export class UpdateItemFail implements Action {
  readonly type = ItemActionTypes.UPDATE_ITEM_FAIL;
  constructor(public payload: string) { }
}
/* Delete Item */
export class DeleteItem implements Action {
  readonly type = ItemActionTypes.DELETE_ITEM;
  constructor(public payload: string) { }
}
export class DeleteItemSuccess implements Action {
  readonly type = ItemActionTypes.DELETE_ITEM_SUCCESS;
  constructor(public payload: string) { }
}
export class DeleteItemFail implements Action {
  readonly type = ItemActionTypes.DELETE_ITEM_FAIL;
  constructor(public payload: string) { }
}

export type Actions =
  | LoadItems
  | LoadItemsSuccess
  | LoadItemsFail
  | LoadItem
  | LoadItemSuccess
  | LoadItemFail
  | CreateItem
  | CreateItemSuccess
  | CreateItemFail
  | UpdateItem
  | UpdateItemSuccess
  | UpdateItemFail
  | DeleteItem
  | DeleteItemSuccess
  | DeleteItemFail;
