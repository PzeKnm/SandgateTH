import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-question',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.scss'],
  animations: [
    trigger('questionChanged', [
      state('onscreen' , style({ transform: 'translateX(0%)' })), 
      state('offscreen', style({ transform: 'translateX(-120%)' })),
      transition('* => *', animate('1.5s'))
      ])     
  ]
})
export class QuestionDisplay implements OnInit, OnChanges {

  @Input() question: string;

  @Input() requiredHeight: string = '10vh';

  public displayedText: string;
  public pendingText: string;

  questionStatus = 'onscreen';

  
  
  constructor() { } 

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
      if(changes.question !== undefined) {
        if(changes.question.previousValue !== undefined) {
          this.questionStatus = 'offscreen';
          this.pendingText = changes.question.currentValue;
        } else {
          this.pendingText = '';
          this.displayedText = changes.question.currentValue;
        }        
      }
    }

  animationDone(event: AnimationEvent) {
    if(this.questionStatus === 'onscreen') {
      return;
    }
    this.displayedText = this.pendingText;
    this.questionStatus = 'onscreen';
  }

}
