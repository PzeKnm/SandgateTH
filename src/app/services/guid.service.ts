import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';



@Injectable()
export class GuidService  {

    constructor(private router: Router) {
        
    }

    newGuidAsString(): string {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0, v = c === 'x' ? r : ( r & 0x3 | 0x8 );
          return v.toString(16);
      });
  }

}