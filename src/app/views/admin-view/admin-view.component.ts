import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { UserDto } from 'src/app/shared/model/game';
import { Subscription } from 'rxjs';
import { VisualisationData, Question } from 'src/app/services/visualisation-data.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  public users: Array<UserDto> = [];

  public currentUser: UserDto;

  public amount: number | string = '';

  public vizData: VisualisationData;



  constructor(private dataCache: DataCacheService) { }

  ngOnInit() {
    this.subscriptions.add(
      this.dataCache.users$.subscribe(response => {
        this.users = response;
      })
    );

    this.subscriptions.add(
      this.dataCache.currentUser$.subscribe(response => {
        this.currentUser = response;
      })
    );

    this.dataCache.refreshCurrentUser();

    this.vizData = new VisualisationData();
    this.vizData.accessCode = 1234;
    this.vizData.internalState = 'DisplayAnswer';
    this.vizData.score = 24;
    this.vizData.currentQuestion = new Question();
    this.vizData.currentQuestion.questionText = 'When was the Battle of Hastings?';
    this.vizData.currentQuestion.answer = 1066;
    this.vizData.currentQuestionMin = 1016;
    this.vizData.currentQuestionMax = 1278;
    this.vizData.currentAnswerLo = 1047;
    this.vizData.currentAnswerHi = 1122;  
    this.vizData.totalGameSecs = 60;   
    this.vizData.remainingSecs = 40;
    this.vizData.remainingQuestionSecs = 5; 

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onCodeEntered(s: string): void {
    console.log('try using ' + s);
  }



}
