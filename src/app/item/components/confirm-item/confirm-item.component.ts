import { Component, OnInit, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from '../../models/item.model';

@Component({
  templateUrl: './confirm-item.component.html',
  styleUrls: ['./confirm-item.component.scss']
})
export class ConfirmItemComponent implements OnInit {
  confirmation: Subject<boolean> = new Subject();
  constructor(
    public dialogRef: MatDialogRef<ConfirmItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onConfirm() {
    this.confirmation.next(true);
    this.dialogRef.close();
  }
}
