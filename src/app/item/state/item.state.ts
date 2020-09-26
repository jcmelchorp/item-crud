import { Item } from '../models/item.model';

export interface ItemsState {
  items: Item[] | null;
  loading: boolean;
  error: string;
}

export const itemsInitialState: ItemsState = {
  items: null,
  loading: false,
  error: null,
};
