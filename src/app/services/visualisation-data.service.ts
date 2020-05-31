import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Observable, Subject, Subscription, timer, BehaviorSubject } from "rxjs";
//import { SignalRConnectionInfo } from "./signalr-connection-info.model";
import { map, delay } from "rxjs/operators";


/*
export class SignalRConnectionInfo {
  url: string;
  accessToken: string;
}
*/

export class Question
{
  public questionKey: number;
  public category: string;
  public questionText: string;
  public answer: number;
  public rangeLo: number;
  public rangeHi: number;
}



export class VisualisationData {

  public environmentStatus: number
  public gameState: string;

  /**
   *   Ready = 0,
      FetchQuestion,
      DisplayQuestion,
      DisplayAnswer
   */
  public internalState: string; 
  public accessCode: number;
  public currentQuestion: Question; 
  public currentQuestionMin: number;
  public currentQuestionMax: number;
  public currentAnswerLo: number;
  public currentAnswerHi: number;
  public potentialScore: number;
  public score: number;
  public totalGameSecs: number; // not just the game mode, could be auth or postgame too
  public remainingSecs: number; // not just the game mode, could be auth or postgame too
  public remainingQuestionSecs: number; // only used in game playing mode 
}



@Injectable()
export class VisualisationDataService {

    private readonly _http: HttpClient;
   //  private readonly _baseUrl: string = "http://localhost:7071/api/";
   private readonly _baseUrl: string = "http://localhost:5000/";

    private hubConnection: HubConnection;

    // Incoming client messages, may not all be for this client
    incomingData$: Subject<VisualisationData> = new Subject();

    isConnected$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private reconnectTimer: Subscription;

    constructor(http: HttpClient) {
        this._http = http;
    }

    /*
    private getConnectionInfo(): Observable<SignalRConnectionInfo> {
        let requestUrl = `${this._baseUrl}`;
        return this._http.get<SignalRConnectionInfo>(requestUrl, 
          { withCredentials: true });
    }*/

    /**  */
    public init(): Promise<boolean> {

      const promise = new Promise<any>((resolve:any, reject: any): any =>{
  
          let requestUrl = "http://localhost:5000/hubs/visualisation";
          this.hubConnection = new signalR.HubConnectionBuilder()
              .withUrl(requestUrl)           
              .configureLogging(signalR.LogLevel.Information)
              .build(); 
         
          this.hubConnection.start()
          .then(() =>  {
            console.log('hubConnection started');
            resolve(true);
           } )
          .catch(
            err => {
              console.error(err.toString());
              reject(false);
            });   
            
          this.hubConnection.on('SendVisualisation', (data: any) => {
            console.log(data);
            this.incomingData$.next(data);               
          });           

        }); 

      return promise;
    }


    public initialise(): void {
      let requestUrl = "http://localhost:5000/hubs/visualisation";
      this.hubConnection = new signalR.HubConnectionBuilder()
          .withUrl(requestUrl)           
          .configureLogging(signalR.LogLevel.Information)
          .build(); 
     
      this.hubConnection.on('SendVisualisation', (data: any) => {
    //    console.log(data);
        let viz: VisualisationData = data as VisualisationData;
        this.incomingData$.next(viz);               
      });  
      
      this.hubConnection.onclose((err) => {
   //     console.log(err);
        this.tryToConnect();
      });

      this.tryToConnect();  
    }


    public tryToConnect(): boolean {

      if (this.reconnectTimer) {
        this.reconnectTimer.unsubscribe();    
        this.reconnectTimer = undefined;    
      }

      this.hubConnection.start()
      .then(() =>  {
    //    console.log('hubConnection started');
        this.isConnected$.next(true);
       } )
      .catch(
        err => {
       //   console.error(err.toString());
          this.isConnected$.next(false);
          this.reconnectTimer = timer(10000, 10000).subscribe(() => {
         //     console.log('Trying to reconnect to the sigR.');
              this.tryToConnect();
            });
        });   
      

      return true;
    }

}