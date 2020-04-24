import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { GameDto } from 'src/app/shared/model/game';
import { WatchDogService } from 'src/app/services/watch-dog.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  public games: Array<GameDto> = [];

  private cAutoRefreshStationsTimeout  = 30;
  
  message: string;

  private cookieValue: string;

  constructor(private dataCache: DataCacheService,
              private watchDogRefresh: WatchDogService) {
  }

  ngOnInit() {

    this.subscriptions.add(
      this.dataCache.games$.subscribe(response => {
        this.games = response;
        console.log(this.games);
      })
    );

    this.subscriptions.add(
      this.watchDogRefresh.expired$.subscribe(
        () => {
          this.watchDogRefresh_Timeout();
        }
      )
    );
  
    this.dataCache.refreshStations();
    this.watchDogRefresh.start(this.cAutoRefreshStationsTimeout);

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  watchDogRefresh_Timeout() {
    this.dataCache.refreshStations();
  }


}
