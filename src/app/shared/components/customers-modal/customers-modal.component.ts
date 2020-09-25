import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Customer } from '../../../customers/models/customer.model';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customers-modal',
  templateUrl: './customers-modal.component.html',
  styleUrls: ['./customers-modal.component.scss']
})
export class CustomersModalComponent implements OnInit {
  @ViewChild('customerForm', { static: true }) customerForm: NgForm;

  heading: string;
  customer: Customer = {};

  customerData: Subject<Customer> = new Subject();

  constructor(
    public modalRef: MDBModalRef,
    public translate: TranslateService) {
      translate.addLangs(['en', 'es']);
      translate.setDefaultLang('es');
  }
  switchLang(lang: string) {
      this.translate.use(lang);
  }

  ngOnInit() {
  }

  onSave() {
    if (this.customerForm.valid) {
      this.customerData.next(this.customer);
    this.modalRef.hide();
    } else {
      const controls = this.customerForm.controls;
      Object.keys(controls).forEach( controlName => controls[controlName].markAsTouched());
    }
  }

}
