import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  animations: [
    trigger('myAnimationtrigger', [
      state('stable' , style({ transform: 'translateY(0%)', opacity: 1 })),
      state('exitRight', style({ transform: 'translateY(-100%)', opacity: 0 })),
      transition('stable => exitRight', animate('0.2s')),   
      transition('exitRight => stable', animate('0.0s'))
      ]) 
  ]
})
export class Score implements OnInit, OnChanges  {

  @Input() score: number = 0;


  // the score we need to get to
  public targetScore: number;

  // the current score, in cases where we're not just incrementing by one
  public currentScore: number;

  // the old/prev score, that is scrolling away
  public oldScore: number;

  // The data attribute that will be manipulated to cause the animation
  myAnimationStep = 'stable'; // 'exitRight'
  
  constructor() { } 

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.score !== undefined) {

      this.targetScore = changes.score.currentValue; 

      if(changes.score.previousValue !== undefined) {
        // Changes to the score, not through initialisation      
        this.myAnimationStep = 'exitRight';
        this.currentScore++;

      } else {
        this.currentScore = changes.score.currentValue;
        this.oldScore = changes.score.currentValue;
      }        
    }
  }

  myAnimationDone(event: AnimationEvent) {
    if(event.fromState === 'void') {
      return;
    }

    if(event.toState == 'exitRight') {
      // update the background display and reset the moving display
      this.oldScore = this.currentScore;
      this.myAnimationStep = 'stable';      
    }

    if(event.toState == 'stable') {
      // One increment iterate has completed, do we need another one?
      if(this.currentScore !== this.targetScore) {
        this.myAnimationStep = 'exitRight';
        this.currentScore++;
      } 
    }    
  }

}
