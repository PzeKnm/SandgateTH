import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { GameDto, AccessResultDto } from 'src/app/shared/model/game';
import { AlertService } from 'src/app/services/alert.service';
import { Subscription } from 'rxjs';
import { WatchDogService } from 'src/app/services/watch-dog.service';
import { trigger } from '@angular/animations';
import { ClientMessage } from 'src/app/services/signal-r.service';
import { NumpadComponent } from 'src/app/components/numpad/numpad.component';

/**/
export enum PageState {
  GameNotOnline = 'GameNotOnline',
  GameBusy = 'GameBusy',
  GenerateCode = 'GenerateCode',
  EnterCode = 'EnterCode',
  NoCodeGenerated = 'NoCodeGenerated', 
  CheckingCode = 'CheckingCode', 
  WrongCode = 'WrongCode', 
  TimedOut = 'TimedOut',
};




@Component({
  selector: 'app-access-code-login',
  templateUrl: './access-code-login.component.html',
  styleUrls: ['./access-code-login.component.scss']
})
export class AccessCodeLoginView implements OnInit, OnDestroy {

  @Input() pageState: PageState = PageState.GenerateCode;
  // GameNotOnline, GameBusy, GenerateCode, EnterCode, NoCodeGenerated, CheckingCode, WrongCode, TimedOut
  
  @ViewChild(NumpadComponent) numpad: NumpadComponent;





  public game: GameDto = undefined;
  private gameId: string = undefined;

  // How long the page will wait for the user to key in the code. Set by server
  private cAuthenticationTimeout  = 30;

  // How long the page will wait for the server to come back with a new code.
  private cGeneratingCodeTimeout = 10;

  // Whether the request to generate a code is still underway.
  public accessCodeGenerationOutstanding = true;
  // the result of the request to generate the access code.
  public accessCodeGenerationSuccessful = false;

  // For storing the subscription so that they can be cleaned up.
  private subscriptions = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private dataCache: DataCacheService,
              private watchDogAuthenticationCountdown: WatchDogService) {
    this.activatedRoute.params.subscribe(params => {
      this.gameId = params['GameId'];  
    });
  }

  ngOnInit() {

    // subscribe to the results of the call to find the game......
    this.subscriptions.add(
      this.dataCache.gameRequested$.subscribe(
        (data: GameDto) => {
          // Once the game is found, see if we can ask it for an access code.
          this.game = data;  
          this.afterGameFound();
      })
    );

    // .. and kick off the find.
    this.dataCache.getGame(this.gameId);

    // Subscribe to the results of trying an access code.
    this.subscriptions.add(
      this.dataCache.accessResult$.subscribe(
        data => {
          this.onAccessResultArrived(data);
      })
    );

    // subscribe to any commands coming in from Station
    this.subscriptions.add(
      this.dataCache.clientMessages$.subscribe(cm => {
        this.processClientMessage(cm);      
      })  
    );  

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  afterGameFound(): void {

    if(this.game === undefined) {
      return;
    }
    
    if(this.game.status === 'Online') {
      this.askServerForAccessCode();
    } else {
      if( this.game.status === 'Authenticating' || this.game.status === 'PreGame' || 
          this.game.status === 'GamePlaying'    || this.game.status === 'PostGame' ) {
          this.pageState = PageState.GameBusy;
        }     
        
      if(this.game.status === 'Deactivated') {
        this.pageState = PageState.GameNotOnline;
      }          
      /** public enum GameManagerState
             {
               Initialised = 0,
              Activated = 1,
              Online = 2,
              Authenticating = 3,
              PreGame = 4,
              GamePlaying = 5,
              PostGame = 6,
              Deactivated = 7
            }*/
    }

  }

  askServerForAccessCode(): void {
    console.log('AccesCode: enter askServerForAccessCode');
    // Subscribe to the results of asking for an access code.
    this.accessCodeGenerationOutstanding = true;
    this.accessCodeGenerationSuccessful = false;
    this.subscriptions.add(
      this.dataCache.askServerForNewAccessCodeResult$.subscribe(
        data => {
          console.log('AccesCode: askServerForNewAccessCodeResult$ has data ' + data);
          this.accessCodeGenerationOutstanding = false;
          if (data === true) {
            // The request to generate the code was accepted, but isn't yet updated
            // this.pageState = "EnterCode";
            // this.accessCodeGenerationSuccessful = true;
          } else {
            this.accessCodeGenerationSuccessful = false;
            this.pageState = PageState.NoCodeGenerated;
            // Navigate to home page
        //     this.router.navigate(['/'])
          }       
      })
    );

    // Then kick off the request
    this.dataCache.askServerForNewAccessCode(this.game.id);
    this.pageState = PageState.GenerateCode;

    this.subscriptions.add(
      this.watchDogAuthenticationCountdown.expired$.subscribe(
        () => {
          this.watchDogBites_Timeout();
        }
      )
    );
    this.watchDogAuthenticationCountdown.start(this.cGeneratingCodeTimeout);
  }



  public getMessageText(): string {
    if (this.pageState === PageState.GameNotOnline) {
      return 'It looks like the game isn\'t online right now :-(';
    }

    if (this.pageState === PageState.GameBusy) {
      return 'It looks like the game is busy with someone else right now :-(';
    }

    if (this.pageState === PageState.GenerateCode) {
      return 'Generating access code for station.....';
    }

    if (this.pageState === PageState.NoCodeGenerated) {
      return 'No code generated.....';
    }

    if (this.pageState === PageState.WrongCode) {
      return 'Wrong code. Try again.';
    }

    if (this.pageState === PageState.CheckingCode) {
      return 'Checking code...';
    }

    if (this.pageState === PageState.TimedOut) {
      return 'Timed out. Go back to Home page';
    }

    if (this.pageState === PageState.EnterCode || this.pageState === PageState.WrongCode)
    {
      return 'Enter access code';
    }

    return 'who knows';
  }

  showInputControls(): boolean {
    return (  this.pageState === PageState.EnterCode || 
              this.pageState === PageState.WrongCode || 
              this.pageState === PageState.CheckingCode );
  }

  public getBannerImage(): string {

    if(this.gameId !== undefined) {
      if(this.gameId === '141e3cd9-0002-4079-bc1e-5a8aa213098b') {
        return 'assets/images/more-or-less-banner-logo.svg';        
      }
    }
    return 'assets/images/game-logo-banner.svg';
  }


  onEnterCode(code: string) {
    if (this.game === undefined) {
      return;
    }
    this.dataCache.checkAccessCode(this.game.id, code);    
    this.pageState = PageState.CheckingCode;
  }


  onAccessResultArrived(dto: AccessResultDto) {
    if(!dto ) {
      return;
    }
    if(dto.success === true) {
      this.router.navigate(['/GameUI', this.game.id]);
      console.log('Yay!');
    } else {
      this.pageState = PageState.WrongCode;
      // this.watchDog.restart();
      this.numpad.reset();
    }
  }


  getTimeRemaining(): number {
    return this.watchDogAuthenticationCountdown.currentCount;
  }

  watchDogBites_Timeout() {
    this.pageState = PageState.TimedOut;
  }

  
  processClientMessage(cm: ClientMessage) {
    console.log(cm);
    if (cm.command === 'AuthenticationTimeout') {
      this.pageState = PageState.EnterCode;
      this.accessCodeGenerationSuccessful = true;
      this.cAuthenticationTimeout = Number(cm.parameters);
      this.watchDogAuthenticationCountdown.start(this.cAuthenticationTimeout);
      return;
    }  

  }

}
