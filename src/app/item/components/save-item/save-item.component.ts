import { NotificationService } from './../../services/notification.service';
import { Observable } from 'rxjs';
import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { v1 as uuid } from 'uuid';
import { Item } from '../../models/item.model';
import { Store } from '@ngrx/store';
import * as itemActions from '../../state/item.actions';
import * as fromItem from '../../state/item.reducer';

@Component({
  selector: 'app-save-item',
  templateUrl: './save-item.component.html',
  styleUrls: ['./save-item.component.scss']
})
export class SaveItemComponent implements OnInit {
  itemForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromItem.AppState>,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.selectCurrentItem();
  }

  initializeForm(): void {
    this.itemForm = this.formBuilder.group({
      id: new FormControl(''),
      itemName: new FormControl('', Validators.required),
      isActive: new FormControl(''),
      dateCreated: new FormControl(''),
      dateModified: new FormControl('')
    });

  }

  selectCurrentItem(): void {
    const item$: Observable<Item> = this.store.select(fromItem.getCurrentItem);
    item$.subscribe(currentItem => {
      if (currentItem) {
        this.itemForm.patchValue({
          itemName: currentItem.itemName,
          id: currentItem.id,
          isActive: currentItem.isActive,
          dateCreated: currentItem.dateCreated,
        });
      }
    });
  }

  onReset(): void {
    this.itemForm.reset();
    this.initializeForm();
  }

  onSave(): void {
    if (this.itemForm.valid) {
      const newItem: Item = {
        id: this.itemForm.get('id').value,
        itemName: this.itemForm.get('itemName').value,
        isActive: true,
        dateCreated: this.itemForm.get('dateCreated').value
      };
      if (newItem.id === '') {
        newItem.id = uuid();
        newItem.dateCreated = new Date(Date.now());
        this.store.dispatch(new itemActions.CreateItem(newItem));
        this.notificationService.showNotification(
          'Item: "' + newItem.itemName + '" was created at:' + newItem.dateCreated.toString(), null, 10);
        this.onReset();
      } else {
        newItem.dateModified = new Date(Date.now());
        this.store.dispatch(new itemActions.UpdateItem(newItem));
        this.notificationService.showNotification(
          'Item: "' + newItem.itemName + '"\n was updated at:' + newItem.dateModified.toString(), null, 10);
        this.onReset();
      }

    }
  }
}
