import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchDogService {

  /** whether the watchdog is running or not */
  running: boolean = false;

  /** The current time remaining in seconds */
  currentCount: number = 0;
  
  warnAt: number = 0;
  tickerInterval: any;
  public warn$: Subject<any>	= new Subject<any>();
  public expired$: Subject<any>	= new Subject<any>();

 // warn: Observable<any> = Observable.create();
 // expired: Observable<any> = Observable.create();
  initialCountValue: number = 0;

  constructor(){}

  start(countdownFrom:number = 10, warnAt: number = 5){
      this.clear();
      this.running = true;
      this.currentCount = countdownFrom;
      this.initialCountValue = countdownFrom;
      this.warnAt = warnAt;
      this.tickerInterval = setInterval(this.tick.bind(this), 1000);
  }

  clear(){
    clearInterval(this.tickerInterval);
    this.running = false;
    this.currentCount = this.initialCountValue;
  }

  restart(){
    this.currentCount = this.initialCountValue;
  }

  tick(){
    if(this.currentCount <= this.warnAt){
      this.warn$.next(this.currentCount);
     // this.warn.next(this.currentCount);
    }

    if(this.currentCount === 0){
      this.expired$.next(true);
      this.running = false;
      clearInterval(this.tickerInterval);
    }

    this.currentCount--;

  }
}
