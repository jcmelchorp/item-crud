import { v1 as uuid } from 'uuid';
export interface Item {
  id: uuid;
  itemName: string;
  isActive?: boolean;
  dateCreated?: Date;
  dateModified?: Date;
}
