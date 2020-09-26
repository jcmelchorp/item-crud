import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../models/item.model';
import { Store, select } from '@ngrx/store';
import * as itemActions from '../../state/item.actions';
import * as fromItem from '../../state/item.reducer';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmItemComponent } from '../confirm-item/confirm-item.component';
import { NotificationService } from '../../services/notification.service';
import { AppState } from 'src/app/reducers';
import { getError, getItems } from '../../state/item.selectors';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  items$: Observable<Item[]>;
  error$: Observable<string>;
  @Input() items: Item[];
  @Input() editable = true;
  @Output() itemDeleted = new EventEmitter<Item>();
  @Output() itemEdited = new EventEmitter<Item>();
  /* Table vars */
  displayedColumns: string[] = [
    'name',
    'dateCreated',
    'dateModified',
    'isActive',
    'actions',
  ];
  constructor(
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  onItemDelete(item: Item) {
    this.itemDeleted.emit(item);
  }

  trackByFunction(index: any) {
    return index;
  }
  ngOnInit(): void {
    this.items$ = this.store.pipe(select(getItems));
    this.error$ = this.store.pipe(select(getError));
  }

  deleteItem(item: Item): void {
    const dialogRef = this.dialog.open(ConfirmItemComponent, {
      width: '300px',
      data: item,
    });
    dialogRef.componentInstance.confirmation.subscribe(
      (confirmation: boolean) => {
        if (confirmation) {
          this.store.dispatch(new itemActions.ItemDeleted(item.key));
          this.notificationService.showNotification(
            'Item: "' + item.itemName + '" was deleted',
            null,
            5
          );
        }
      }
    );
  }

  editItem(item: Item): void {
    this.itemEdited.emit(item);
    //this.store.dispatch(new itemActions.ItemEdited({ item }));
  }

  toggleIsActive(item: Item): void {
    console.log(item);
    const newItem = {
      key: item.key,
      itemName: item.itemName,
      isActive: !item.isActive,
      dateCreated: item.dateCreated,
      dateModified: new Date(Date.now()).toISOString(),
    };
    console.log(newItem);

    this.store.dispatch(new itemActions.ItemEdited({ item: newItem }));
    this.notificationService.showNotification(
      'Item: "' +
        newItem.itemName +
        '" was ' +
        [newItem.isActive ? 'Activated' : 'Deactivated'],
      null,
      5
    );
  }
}
