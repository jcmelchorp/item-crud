import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemComponent } from './containers/item.component';

const itemRoutes: Routes = [{ path: '', component: ItemComponent }];

@NgModule({
  imports: [RouterModule.forChild(itemRoutes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
