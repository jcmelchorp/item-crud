import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { from, Observable, Subject } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class AfItemService {
  selectedItem = new Subject();
  selectedItem$ = this.selectedItem.asObservable();
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {}

  createItem(item: Item) {
    const items = this.db.object('item/' + item.id);
    return items
      .set(item)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }
}
