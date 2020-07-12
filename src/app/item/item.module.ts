import { ItemService } from './services/item.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { itemReducer } from './state/item.reducer';
import { ItemEffect } from './state/item.effects';
import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './containers/item.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { SaveItemComponent } from './components/save-item/save-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [ItemComponent, ItemsListComponent, SaveItemComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ItemRoutingModule,
    FontAwesomeModule,
    MaterialModule,
    StoreModule.forFeature('items', itemReducer),
    EffectsModule.forFeature([ItemEffect]),
  ],
  providers: [ItemService]
})
export class ItemModule { }
