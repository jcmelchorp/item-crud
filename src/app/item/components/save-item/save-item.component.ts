import { AppState } from './../../../reducers/index';
import { NotificationService } from './../../services/notification.service';
import { Observable, Subject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { v1 as uuid } from 'uuid';
import { Item } from '../../models/item.model';
import { select, Store } from '@ngrx/store';
import * as itemActions from '../../store/item.actions';
import * as fromItem from '../../store/item.reducer';
import { getAllLoaded, getItems } from '../../store/item.selectors';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-save-item',
  templateUrl: './save-item.component.html',
  styleUrls: ['./save-item.component.scss'],
})
export class SaveItemComponent implements OnInit {
  itemForm: FormGroup;
  @Input() item: Item;
  items$: Observable<Item[] | null>;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private notificationService: NotificationService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.items$ = this.store.pipe(
      select(getItems),
      map((items: Item[]) => {
        if (this.user && !items) {
          this.store.dispatch(new itemActions.ItemsQuery());
        }
        return items;
      })
    );
  }
  get user(): Promise<firebase.User> {
    return this.afAuth.currentUser;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
  initializeForm(): void {
    this.itemForm = this.formBuilder.group({
      key: new FormControl(''),
      itemName: new FormControl('', Validators.required),
      isActive: new FormControl('true', Validators.required),
      dateCreated: new FormControl(''),
      dateModified: new FormControl(''),
    });
  }

  selectCurrentItem(): void {
    /* this.item: Observable<Item> = this.store.select(getItem);
    item.subscribe((currentItem) => {
      if (currentItem) {
        this.itemForm.patchValue({
          key: currentItem.key,
          itemName: currentItem.itemName,
          isActive: currentItem.isActive,
          dateCreated: currentItem.dateCreated,
          dateModified: currentItem.dateModified,
        });
      }
    });  */
  }

  onReset(): void {
    this.itemForm.reset();
    this.initializeForm();
  }

  onSave(): void {
    if (this.itemForm.valid) {
      const newItem: Item = {
        key: this.itemForm.get('key').value,
        itemName: this.itemForm.get('itemName').value,
        isActive: this.itemForm.get('isActive').value,
        dateCreated: this.itemForm.get('dateCreated').value,
      };
      if (newItem.key === '') {
        newItem.dateCreated = new Date(Date.now()).toISOString();
        this.store.dispatch(new itemActions.ItemAdded({ item: newItem }));
        this.notificationService.showNotification(
          'Item: "' + newItem.itemName + '" was created',
          null,
          5
        );
        this.onReset();
      } else {
        newItem.dateModified = new Date(Date.now()).toISOString();
        this.store.dispatch(new itemActions.ItemEdited({ item: newItem }));
        this.notificationService.showNotification(
          'Item: "' + newItem.itemName + '" was updated',
          null,
          5
        );
        this.onReset();
      }
    }
  }
}
