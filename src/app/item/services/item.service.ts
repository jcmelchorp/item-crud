import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable()
export class ItemService {
  private SERVER_URL = 'http://localhost:3000/items/';
  constructor(private httpClient: HttpClient) { }
  getItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.SERVER_URL);
  }
  getItemById(id: string): Observable<Item> {
    return this.httpClient.get<Item>(this.SERVER_URL + id);
  }
  createItem(item: Item): Observable<Item> {
    return this.httpClient.post<Item>(this.SERVER_URL, item,);
  }
  updateItem(item: Item): Observable<Item> {
    return this.httpClient.patch<Item>(this.SERVER_URL + item.id, item);
  }
  deleteItem(id: string): Observable<Item> {
    return this.httpClient.delete<Item>(this.SERVER_URL + id);
  }
}
