import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../models/item.model';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../state/item.actions';
import * as fromItem from '../../state/item.reducer';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmItemComponent } from '../confirm-item/confirm-item.component';
import { NotificationService } from '../../services/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  items$: Observable<Item[]>;
  error$: Observable<string>;
  /* Table vars */
  displayedColumns: string[] = ['name', 'dateCreated', 'dateModified', 'isActive', 'actions'];
  constructor(
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private store: Store<fromItem.AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new itemActions.LoadItems());
    this.items$ = this.store.pipe(select(fromItem.getItems));
    this.error$ = this.store.pipe(select(fromItem.getError));
  }

  deleteItem(item: Item): void {
    const dialogRef = this.dialog.open(ConfirmItemComponent, {
      width: '300px',
      data: item
    });
    dialogRef.componentInstance.confirmation.subscribe((confirmation: boolean) => {
      if (confirmation) {
        this.store.dispatch(new itemActions.DeleteItem(item.id));
        this.notificationService.showNotification('Item: "' + item.itemName + '" was deleted', null, 5);
      }
    });
  }

  editItem(itemId: string): void {
    this.store.dispatch(new itemActions.LoadItem(itemId));
  }

  toggleIsActive(item: Item) {
    console.log(item);
    const newItem = {
      id: item.id,
      itemName: item.itemName,
      isActive: !item.isActive,
      dateCreated: item.dateCreated,
      dateModified: new Date(Date.now())
    };
    console.log(newItem);

    this.store.dispatch(new itemActions.UpdateItem(newItem));
    this.notificationService.showNotification(
      'Item: "' + newItem.itemName + '" was ' + [(newItem.isActive) ? 'Activated' : 'Deactivated'], null, 5);
  }
}
