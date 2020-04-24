import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataCacheService } from 'src/app/services/data-cache.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit, OnDestroy {

  gameTokenDetails: string;

  private subscriptions = new Subscription();

  constructor(private dataCache: DataCacheService) { }

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
