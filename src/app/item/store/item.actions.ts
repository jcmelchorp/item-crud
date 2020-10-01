import { Action } from '@ngrx/store';
import { Item } from '../models/item.model';

export enum ItemsActionTypes {
  ITEMS_QUERY = '[Items] Items query',
  ITEMS_LOADED = '[Items] Items loaded',
  ITEM_ADDED = '[Items] Item added',
  ITEM_EDITED = '[Items] Item edited',
  ITEM_DELETED = '[Items] Item deleted',
  ITEMS_ERROR = '[Items] Items error',
}
export class ItemsQuery implements Action {
  readonly type = ItemsActionTypes.ITEMS_QUERY;
}

export class ItemsLoaded implements Action {
  readonly type = ItemsActionTypes.ITEMS_LOADED;

  constructor(public payload: { items: Item[] }) {}
}

export class ItemAdded implements Action {
  readonly type = ItemsActionTypes.ITEM_ADDED;

  constructor(public payload: { item: Item }) {}
}

export class ItemEdited implements Action {
  readonly type = ItemsActionTypes.ITEM_EDITED;

  constructor(public payload: { item: Item }) {}
}

export class ItemDeleted implements Action {
  readonly type = ItemsActionTypes.ITEM_DELETED;

  constructor(public payload: { item: Item }) {}
}

export class ItemsError implements Action {
  readonly type = ItemsActionTypes.ITEMS_ERROR;

  constructor(public payload: { error: any }) {}
}

export type Actions =
  | ItemsQuery
  | ItemsLoaded
  | ItemAdded
  | ItemEdited
  | ItemDeleted
  | ItemsError;
