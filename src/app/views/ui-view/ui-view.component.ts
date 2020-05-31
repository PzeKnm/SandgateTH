import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataCacheService } from 'src/app/services/data-cache.service';
import { UserDto } from 'src/app/shared/model/game';
import { Subscription } from 'rxjs';
import { VisualisationData, Question } from 'src/app/services/visualisation-data.service';
import { MyValidationError, MyAssertionError } from 'src/app/services/global-error-handler';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-admin-view',
  templateUrl: './ui-view.component.html',
  styleUrls: ['./ui-view.component.scss']
})
export class UiViewComponent implements OnInit, OnDestroy {

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


  doTest(): void {
    /*
    try {
      throw new Error('An error occurred');
     }
     catch (error) {
      console.error('Here is the error message', error);
     }
     console.log('Execution continues');

     throw new Error('Another error occurred');
*/

//const obj = JSON.parse('{ "name": "John", "age": 30 }}');  
  //   const s = new SyntaxError('fdsdsf');
 // FormControl

 // throw new MyValidationError('Another error occurred', 'fdsfds');

//  try {


     throw new MyAssertionError('this should not happen');

    const err = new HttpErrorResponse({
      error: 'My error',
      status: 499,
      statusText: 'hhtp error of some kind'
    });

    const c1 = ((/** @type {?} */ (err)))["ngDebugContext"];

    // err["ngDebugContext"]='Dont overwrite me!';

    const c2 = ((/** @type {?} */ (err)))["ngDebugContext"];

    if (err instanceof HttpErrorResponse) {
      console.log('Its a HttpErrorResponse Error');
    } 

    if (err instanceof Error) {
      console.log('Its a Error Error');
    } 

    const synErr = new SyntaxError('gfdgfg');
    if (synErr instanceof SyntaxError) {
      console.log('Its a SyntaxError Error');
    } 

    if (synErr instanceof Error) {
      console.log('Its a Error Error');
    }     



    throw err;    
//  }
  /*
  catch (e) {
    if (e instanceof HttpErrorResponse) {
      console.log('Its a HttpErrorResponse Error');
      throw e;
    }

    if (e instanceof Error) {
      console.log('Its a Error');
    }
  }*/



  
    // throw new MySimpleError('A simple error');

     try {
      throw new MyValidationError('Another error occurred', 'fdsfds');
    //  const obj = JSON.parse('{ "name": "John", "age": 30 }}');    
    //  console.log(obj);
     }
     catch (err) {
      if (err instanceof MyValidationError) {
        console.log('Its a Validation Error');
      }
  
      if (err instanceof SyntaxError) {
        console.log('Its a Syntax Error');
      }
     }




  }

}
