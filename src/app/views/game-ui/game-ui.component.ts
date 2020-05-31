import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { ClientMessage } from 'src/app/services/signal-r.service';
import { GameDto } from 'src/app/shared/model/game';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-ui',
  templateUrl: './game-ui.component.html',
  styleUrls: ['./game-ui.component.scss']
})
export class GameUIView implements OnInit, OnDestroy {

  public gameId: string;
  public game: GameDto = undefined;

  // PreGame, Playing, GameOver
  public gameState: string = 'PreGame'; 

  public score: number = 0;
  remainingTime: number = 999;

  // For storing the subscription so that they can be cleaned up.
  private subscriptions = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private dataCache: DataCacheService) { 
      this.activatedRoute.params.subscribe(params => {
        let id = params['GameId'];
        this.gameId = id;
    })
  }

  ngOnInit() {
    if(this.gameId === undefined) {
      return;
    }
    // Check that game Token is valid
    
    if(!this.dataCache.hasValidGameToken(this.gameId)) {
      this.router.navigate(['/AccessCode', this.gameId]);
    }

    this.dataCache.clientMessages$.subscribe(cm => {
      this.processClientMessage(cm);      
    });
   
    this.gameState = 'PreGame';

    // subscribe to the results of the find......
    this.subscriptions.add(
      this.dataCache.gameRequested$.subscribe(
        data => {
          this.game = data;            
      })
    );
    // .. and kick off the find.
    this.dataCache.getGame(this.gameId);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
   }


  getStationID() : string {
    if(this.gameId === '141e3cd9-0002-4079-bc1e-5a8aa213098b') {
      return 'Station002';
    }      

    return 'Station001';
  }
  

  sendCommandToStation(cmd) {  
    
    console.log(cmd);   

    if(cmd === 'BeginGame') {
      this.gameState = 'Playing';
    }

    this.dataCache.sendCommandToGame(this.gameId, cmd, '');
  }


  processClientMessage(cm: ClientMessage) {
    if (cm.command == 'TimeRemaining') {
      this.remainingTime = Number(cm.parameters);
      return;
    }
    if (cm.command == 'NewScore') {
      this.score = Number(cm.parameters);
      return;
    }
    if (cm.command == 'GameOver') {
      this.gameOver();
      return;
    }
    if (cm.command == 'ClientDetached') {
      this.clientDetached();
      return;
    }

    console.log(cm);
  }


  gameOver() {
    console.log('gameOver');
    this.gameState = 'GameOver';
  }

  clientDetached() {
    this.gameOver();
  }


  public getBannerImage(): string {

    if(this.gameId !== undefined) {
      if(this.gameId === '141e3cd9-0002-4079-bc1e-5a8aa213098b') {
        return 'assets/images/more-or-less-banner-logo.svg';        
      }
    }
    return 'assets/images/game-logo-banner.svg';
  }


}
