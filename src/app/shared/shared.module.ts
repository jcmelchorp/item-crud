import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

import { CustomersModalComponent } from './components/customers-modal/customers-modal.component';
import { FormsModule } from '@angular/forms';
import { CustomersListComponent } from './components/customers-list/customers-list.component';

@NgModule({
  declarations: [
    ConfirmModalComponent,
    CustomersModalComponent,
    CustomersListComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [CustomersListComponent],
  providers: [],
  entryComponents: [ConfirmModalComponent, CustomersModalComponent],
})
export class SharedModule {}
