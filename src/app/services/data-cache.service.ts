import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable, Subject } from 'rxjs';
import { GameDto, AccessResultDto, UserDto } from '../shared/model/game';
import { GameService } from './dataAccess/game.service';
import { ROUTER_CONFIGURATION } from '@angular/router';
import { SignalRService, ClientMessage } from './signal-r.service';
import { AlertService } from './alert.service';
import { VisualisationDataService } from './visualisation-data.service';

@Injectable({
  providedIn: 'root'
})
export class DataCacheService implements OnDestroy {

  // whether initial data has been taken from API
  private static isInitialised = false;

  // All the games in the system
  public games$: BehaviorSubject<GameDto[]> = new BehaviorSubject<GameDto[]>([]);

  // The result of inputting an access code.
  public accessResult$: Subject<AccessResultDto>	= new Subject<AccessResultDto>();
 
  // The last result of inputting an access code.
  public lastAccessResult: AccessResultDto; 

  // Currently logged on user id
  public userId: string;

  public users$: BehaviorSubject<UserDto[]> = new BehaviorSubject<UserDto[]>([]);
  public currentUser$: Subject<UserDto> = new Subject<UserDto>();


  // For servicing the "getGame" function
  public gameRequested$: Subject<GameDto>	= new Subject<GameDto>();
  private gameIdRequested: string;


  // Incoming client messages, for this client
  clientMessages$: Subject<ClientMessage> = new Subject();

  // For storing the subscription so that they can be cleaned up.
  private subscriptions = new Subscription();

 // private readonly _signalRService: SignalRService;

 // private readonly _signalRTest: SignalRTest;

  constructor(private srvGame: GameService,
    private signalRService: SignalRService,    
    private alertService: AlertService) {  
  
    //  this._signalRService = signalRService;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /** Use this before calling any signal R relevant code. */
  public EnsureInitialize(): Promise<boolean> {

    if (DataCacheService.isInitialised) {
      return Promise.resolve(true);
    }

    DataCacheService.isInitialised = true; 

    const promise = new Promise<any>((resolve:any, reject:any): any => {
      console.log('before test');  
      this.signalRService.init().then((res) => {
        
        this.signalRService.allClientMessages$.subscribe(cm => {
          this.processAllClientMessage(cm);      
        });
    
        this.subscriptions.add(
          this.srvGame.generateNewAccessCodeResult$.subscribe(
            data => {
              this.askServerForNewAccessCodeResult$.next(data);
          })
        );      

        resolve(true);
      }); 

    });

    this.refreshStations();
    this.refreshUsers();

    return promise;
  }

  public refreshStations(): void {
    this.subscriptions.add(
      this.srvGame.getStations().subscribe(
        data => {
          this.games$.next(data);
      })
    );
  }


  public refreshUsers(): void {
    /* todo 
    this.subscriptions.add(
      this.srvGame.getUsers().subscribe(
        data => {
          this.users$.next(data);
      })
    );*/
  }

  public checkAccessCode(gameId: string, inputCode: string) {
    this.subscriptions.add(
      this.srvGame.checkAccessCode(gameId, inputCode).subscribe(
        data => {
          this.accessResult$.next(data);
          this.lastAccessResult = data;
        },
        err => {
          console.log(err);     
          let dto = new AccessResultDto();
          dto.success = false;
          this.accessResult$.next(dto);
          this.lastAccessResult = dto;          
        }
      )
    );
  }




  getGame(gameId) {

    const games = this.games$.getValue();
    if(games.length > 0) {
      const g = games.find(x => x.id === gameId);
      this.gameRequested$.next(g);
      return;
    }

    // cache not initialised
    this.gameIdRequested = gameId
    this.subscriptions.add(
      this.srvGame.getStations().subscribe(
        data => {
          this.games$.next(data);
          const g = data.find(x => x.id === gameId);
          this.gameRequested$.next(g);
      })
    );

  }

  
  public hasValidGameToken(gameId): Boolean {
    if( this.lastAccessResult === undefined) {
      return false;
    }

    if(this.lastAccessResult.gameId !== gameId) {
      return false;
    }

    return this.lastAccessResult.success;
  }

  public sendCommandToGame(gameId, command: string, parameters: string) {
    if(!this.hasValidGameToken(gameId)) {
      return;
    }

    console.log(command);
    this.srvGame.doCommand(gameId, this.lastAccessResult.token, command, parameters);

  }


  public askServerForNewAccessCodeResult$: Subject<boolean>	= new Subject<boolean>();

  /** Since the replay from the server will be via signal R, we have to ensure
   * that signal R is up and running.
   */
  public askServerForNewAccessCode(gameId) {
    this.EnsureInitialize().then(
      (res) => {
        console.log('DataCacheService: askServerForNewAccessCode');
        this.srvGame.generateNewAccessCode(gameId); 
      });
  }


  private processAllClientMessage(cm: ClientMessage) {

    if(!cm.direction || !(cm.direction === 'Station2SPA')) {
      return;
    }

    if(cm.command !== 'AuthenticationTimeout') {
      if(!this.lastAccessResult || !this.lastAccessResult.token) {
        return;
      }

      if(cm.command === 'GenerateAccessCode' || cm.command === 'BeginGame') {
        return;
      }

      if(this.lastAccessResult.token !== cm.accessToken) {
        return;
      }
    }

    // This client message is for this authenticated client
    this.processClientMessageCommand(cm);
  }

  private processClientMessageCommand(cm: ClientMessage) {
    console.log('processClientMessageCommand');

    // Messages may be std messages, or specific to be passed on the the game, which observes them via
    // the observable.
    if(cm.command === 'DisplayText') {
      this.alertService.success(cm.parameters, false)
      console.log(cm.parameters);
      return;
    }

    this.clientMessages$.next(cm);
  }


  public refreshCurrentUser(): void {
    this.users$.subscribe(
      users => {
        const u = users.find(x => x.id === this.userId);
        this.currentUser$.next(u);
      }
    )
  }


}
