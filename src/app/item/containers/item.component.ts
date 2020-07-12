import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  dismissible = true;
  defaultAlerts: any[] = [
    {
      type: 'success',
      msg: `You successfully read this important alert message.`
    },
    {
      type: 'info',
      msg: `This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      msg: `Better check yourself, you're not looking too good.`
    }
  ];
  alerts = this.defaultAlerts;
  constructor() { }
  ngOnInit(): void { }


  reset(): void {
    this.alerts = this.defaultAlerts;
  }
  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
