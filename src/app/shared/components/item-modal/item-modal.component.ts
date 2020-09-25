import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/item/models/item.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { DialogAlert } from '../../models/dialog-alert';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss'],
})
export class ItemModalComponent implements OnInit {
  @ViewChild('itemForm', { static: true }) itemForm: NgForm;

  heading: string;

  title: string;
  description: string;
  photoUrl: string;

  itemData: Subject<Item> = new Subject();
  item: Item;

  constructor(
    public dialogRef: MatDialogRef<AppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogAlert
  ) {}

  ngOnInit(): void {}

  onSave(): void {
    if (this.itemForm.valid) {
      this.itemData.next(this.item);
      this.dialogRef.close();
    } else {
      const controls = this.itemForm.controls;
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
    }
  }
}
