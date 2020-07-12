import * as itemActions from './item.actions';
import { Item } from '../models/item.model';
import * as fromRoot from '../../state/app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export interface ItemState extends EntityState<Item> {
  selectedItemId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  items: ItemState;
}

export const itemAdapter: EntityAdapter<Item> = createEntityAdapter<Item>();

export const defaultItem: ItemState = {
  ids: [],
  entities: {},
  selectedItemId: null,
  loading: false,
  loaded: false,
  error: '',

}

export const initialState = itemAdapter.getInitialState(defaultItem)


export function itemReducer(state = initialState, action: itemActions.Actions): ItemState {
  switch (action.type) {
    case itemActions.ItemActionTypes.LOAD_ITEMS_SUCCESS: {
      return itemAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case itemActions.ItemActionTypes.LOAD_ITEMS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      }
    }
    case itemActions.ItemActionTypes.LOAD_ITEM_SUCCESS: {
      return itemAdapter.addOne(action.payload, {
        ...state,
        selectedItemId: action.payload.id
      });
    }
    case itemActions.ItemActionTypes.LOAD_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      }
    }
    case itemActions.ItemActionTypes.CREATE_ITEM_SUCCESS: {
      return itemAdapter.addOne(action.payload, state);
    }
    case itemActions.ItemActionTypes.CREATE_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      }
    }
    case itemActions.ItemActionTypes.UPDATE_ITEM_SUCCESS: {
      return itemAdapter.updateOne(action.payload, state);
    }
    case itemActions.ItemActionTypes.UPDATE_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case itemActions.ItemActionTypes.DELETE_ITEM_SUCCESS: {
      return itemAdapter.removeOne(action.payload, state);
    }
    case itemActions.ItemActionTypes.DELETE_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case itemActions.ItemActionTypes.ACTIVATE_ITEM_SUCCESS: {
      return itemAdapter.updateOne(action.payload, state);
    }
    case itemActions.ItemActionTypes.ACTIVATE_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }

}

/* Selectors */
const getItemFeatureState = createFeatureSelector<ItemState>('items');
export const getItems = createSelector(getItemFeatureState, itemAdapter.getSelectors().selectAll);
export const getItemsLoading = createSelector(getItemFeatureState, (state: ItemState) => state.loading);
export const getItemsLoaded = createSelector(getItemFeatureState, (state: ItemState) => state.loaded);
export const getError = createSelector(getItemFeatureState, (state: ItemState) => state.error);
export const getCurrentItemId = createSelector(getItemFeatureState, (state: ItemState) => state.selectedItemId);
export const getCurrentItem = createSelector(
  getItemFeatureState,
  getCurrentItemId,
  state => state.entities[state.selectedItemId]
);
