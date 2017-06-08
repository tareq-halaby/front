import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Client } from '../../common/api/client.service';

@Component({
  selector: 'm-monetization--overview',
  templateUrl: 'overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MonetizationOverviewComponent {

  balance : number | string = '...';
  payouts : number | string = '...';
  net : number | string = '...';

  user = window.Minds.user;

  constructor(private client : Client, private cd: ChangeDetectorRef) {

  }

  ngOnInit(){
    this.getTotals();
  }

  getTotals(){
    this.client.get('api/v1/monetization/revenue/overview')
      .then((response : any) => {
        console.log(response);
        this.balance = response.balance;
        this.payouts = response.payouts;
        this.net = response.total.net;

        this.cd.markForCheck();
        this.cd.detectChanges();
      });
  }

}