import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../../customers/models/customer.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  @Input() customers: Customer[];
  @Output() customerDeleted = new EventEmitter<Customer>();
  @Output() customerEdited = new EventEmitter<Customer>();

  constructor(public translate: TranslateService) {
      translate.addLangs(['en', 'es']);
      translate.setDefaultLang('es');
  }
  switchLang(lang: string) {
      this.translate.use(lang);
  }

  ngOnInit() {
  }

  onEdit(customer: Customer) {
    this.customerEdited.emit(customer);
  }

  onDelete(customer: Customer) {
    this.customerDeleted.emit(customer);
  }

  trackByFn(index: any) {
    return index;
  }
}
