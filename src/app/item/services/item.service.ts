import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { Item } from '../models/item.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

@Injectable()
export class ItemService {
  items$: Observable<Item[]> = null;
  private userId: string;
  private userTkn: string;
  constructor(
    private httpClient: HttpClient,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.userTkn = user.refreshToken;
      }
    });
  }
  /* get userId(): Observable<firebase.User> {
    if (this.afAuth.currentUser) {
      return from(this.afAuth.currentUser);
    }
  } */
  addItem(item: Item, userId: string) {
    const items = this.db.list(`items/${userId}`);
    return items.push(item);
  }
  addItems(items: Item[]): void {
    const userId = this.userId;
    items.forEach((item: Item) => {
      this.db.list(`items/${userId}`).push(item);
    });
  }

  getAll(userId: string) {
    return this.db.list<Item>(`items/${userId}`).snapshotChanges();
  }

  update(item: Item, userId: string) {
    return of(
      this.db.object(`items/${userId}/` + item.key).update({
        key: item.key,
        itemName: item.itemName,
        isActive: item.isActive,
        dateCreated: item.dateCreated,
        dateModified: item.dateModified,
      })
    );
  }

  delete(item: Item, userId: string): Promise<void> {
    return this.db.object(`items/${userId}/` + item.key).remove();
  }
}
