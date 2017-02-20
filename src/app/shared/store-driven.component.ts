import { OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

export class StoreDrivenComponent implements OnInit, OnDestroy {

  storeSubscriptions: Array<Subscription> = [];
  routerSubscription: Subscription;

  constructor(private superRouter: Router) { }

  ngOnInit() {
    this.changeStoreSubscrptionIfNavigating();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  private changeStoreSubscrptionIfNavigating() {
    this.routerSubscription = this.superRouter.events.subscribe(event => {
      if (event instanceof NavigationStart) { 
        this.unsubscribeFromStore();
      }
    });
  }

  private unsubscribeFromStore() {
    this.storeSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
