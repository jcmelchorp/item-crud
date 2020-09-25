import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Item } from '../../../item/models/item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsListComponent implements OnInit {
  @Input() itemss: Item[];
  @Input() editable = true;
  @Output() itemsDeleted = new EventEmitter<Item>();
  @Output() itemsEdited = new EventEmitter<Item>();

  constructor() {}

  ngOnInit(): void {}

  onItemDelete(items: Item): void {
    this.itemsDeleted.emit(items);
  }

  onItemEdit(items: Item): void {
    this.itemsEdited.emit(items);
  }

  trackByFunction(index: any): any {
    return index;
  }
}
