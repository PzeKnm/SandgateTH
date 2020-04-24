import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

export class AlertMessage {
  constructor(
    public type: string,
    public text: string) {
    }
}


@Injectable()
export class AlertService implements OnDestroy {
    private messages$ = new Subject<AlertMessage>();
    private keepAfterNavigationChange = false;

    // For storing the subscription so that they can be cleaned up.
    private subscriptions = new Subscription();

    constructor(private router: Router) {
        // clear alert message on route change
        this.subscriptions.add(
          router.events.subscribe(event => {
              if (event instanceof NavigationStart) {
                  if (this.keepAfterNavigationChange) {
                      // only keep for a single location change
                      this.keepAfterNavigationChange = false;
                  } else {
                      // clear alert
                      this.messages$.next();
                  }
              }
          })
        );
    }

    ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
     }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        const mess = new AlertMessage('success', message);
        this.messages$.next(mess);
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        const mess = new AlertMessage('error', message);
        this.messages$.next(mess);
    }

    /*
    processSwaggerException(exc: SwaggerException) {
      this.keepAfterNavigationChange = false;
      const str = this.getSwaggerErrorMessage(exc);
      const mess = new AlertMessage('error', str);
      this.messages$.next(mess);
    }*/

    getMessage(): Observable<AlertMessage> {
        return this.messages$.asObservable();
    }

    /*
    private getSwaggerErrorMessage(exc: SwaggerException): string {
      try {
        const obj = JSON.parse(exc.response);
        return obj['errorMessage'];
      } catch (e) {
        return exc.message;
      }

    }*/
}