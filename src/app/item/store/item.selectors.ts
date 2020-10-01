import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ItemsState } from './item.state';
// import { AppState } from '../../reducers/index';

export const getItemsState = createFeatureSelector<ItemsState>('items');

export const getItems = createSelector(getItemsState, (items) => items.items);

export const getAllLoaded = createSelector(
  getItemsState,
  (items) => items.loading
);

export const getError = createSelector(getItemsState, (items) => items.error);
