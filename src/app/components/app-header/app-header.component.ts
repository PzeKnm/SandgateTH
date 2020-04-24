import { Component, OnInit, OnDestroy } from '@angular/core';
// import { DataCacheService } from '../services/data-cache.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {

  gameTokenDetails: string;

  private subscriptions = new Subscription();

  constructor(/*private dataCache: DataCacheService*/) { }

  ngOnInit() {

    /*
    this.dataCache.EnsureInitialize().then(
      (res) => {
        this.subscriptions.add(
          this.dataCache.accessResult$.subscribe(
            res => {
              this.gameTokenDetails = res.token;          
            }
          )
        );
      }
    );
*/


  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
   }

  getBuildTimeStamp(): string {
    return environment.timeStamp;
  }
   

}
