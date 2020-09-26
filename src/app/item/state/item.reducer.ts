import * as itemActions from './item.actions';
import { Item } from '../models/item.model';
import * as fromRoot from '../../reducers/index';
import { Actions, ItemsActionTypes } from './item.actions';
import { itemsInitialState, ItemsState } from './item.state';

export function itemReducer(
  state = itemsInitialState,
  action: itemActions.Actions
): ItemsState {
  switch (action.type) {
    case ItemsActionTypes.ITEMS_QUERY: {
      return Object.assign({}, state, {
        loading: true,
      });
    }

    case ItemsActionTypes.ITEMS_LOADED: {
      return Object.assign({}, state, {
        items: action.payload.items,
        loading: false,
      });
    }

    case ItemsActionTypes.ITEMS_ERROR: {
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.error,
      });
    }

    default:
      return state;
  }
}
/*  case itemActions.ItemsActionTypes.LOAD_ITEMS_SUCCESS: {
      return itemAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true,
      });
    }
    case itemActions.ItemsActionTypes.LOAD_ITEMS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }
    case itemActions.ItemsActionTypes.LOAD_ITEM_SUCCESS: {
      return itemAdapter.addOne(action.payload, {
        ...state,
        selectedItemId: action.payload.id,
      });
    }
    case itemActions.ItemsActionTypes.LOAD_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case itemActions.ItemsActionTypes.CREATE_ITEM_SUCCESS: {
      return itemAdapter.addOne(action.payload, state);
    }
    case itemActions.ItemsActionTypes.CREATE_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case itemActions.ItemsActionTypes.UPDATE_ITEM_SUCCESS: {
      return itemAdapter.updateOne(action.payload, state);
    }
    case itemActions.ItemsActionTypes.UPDATE_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case itemActions.ItemsActionTypes.DELETE_ITEM_SUCCESS: {
      return itemAdapter.removeOne(action.payload, state);
    }
    case itemActions.ItemsActionTypes.DELETE_ITEM_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case itemActions.ItemsActionTypes.ACTIVATE_ITEM_SUCCESS: {
      return itemAdapter.updateOne(action.payload, state);
    }
    case itemActions.ItemsActionTypes.ACTIVATE_ITEM_FAIL: {
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
*/
/* Selectors */
/*
const getItemFeatureState = createFeatureSelector<ItemState>('items');
export const getItems = createSelector(
  getItemFeatureState,
  itemAdapter.getSelectors().selectAll
);
export const getItemsLoading = createSelector(
  getItemFeatureState,
  (state: ItemState) => state.loading
);
export const getItemsLoaded = createSelector(
  getItemFeatureState,
  (state: ItemState) => state.loaded
);
export const getError = createSelector(
  getItemFeatureState,
  (state: ItemState) => state.error
);
export const getCurrentItemId = createSelector(
  getItemFeatureState,
  (state: ItemState) => state.selectedItemId
);
export const getCurrentItem = createSelector(
  getItemFeatureState,
  getCurrentItemId,
  (state) => state.entities[state.selectedItemId]
);
*/
