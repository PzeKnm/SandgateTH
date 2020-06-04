import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { trigger, transition, group, query, style, animate, keyframes, state } from '@angular/animations';



@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss']/*,
  animations: [
    
    trigger('answerAnimationStep', [
      state('true' , style({ opacity: 1 })), 
      state('false', style({ opacity: 0 })),
      transition('void => *', animate('0.1s')),    
      transition('* => *', animate('0.5s'))
      ]),   */ 
      /*
    trigger('profileAnimation', [
        state('true' , style({ opacity: 1 })), 
        state('false', style({ opacity: 0 })),
        transition('void => *', animate('0.5s')),    
        transition('* => *', animate('0.5s'))
        ])*//*,
    trigger('profileAnimation', [
          transition('true => false', group([        
            query('.labAnswer', group([
              animate('1000ms ease-in', keyframes([
                style({ opacity: 1, offset:  0.5 }),
                style({ opacity: 0, offset:  1 }),
              ]))  
            ])),
          ])),
          transition('false => true', group([        
            query('.labAnswer', group([
              animate('1000ms ease-in', keyframes([
                style({ opacity: 0, offset:  0.5 }),
                style({ opacity: 1, offset:  1 }),
              ]))  
            ])),
          ])),
        ])
  ]*/
})
export class RangeSelector implements OnInit {

  @Input() min: number = 0;
  @Input() max: number = 100;

  @Input() lo: number = 25;
  @Input() hi: number = 60;

  @Input() answer: number = 30;

 //// @HostBinding('@profileAnimation')  
  @Input() showAnswer: boolean = false; 

  @Input() potentialScore: number = 5;
 //// @Input() showPotentialScore: boolean = false; 


  // public animateProfile = true;

  
  public xPos: number = 50;

  // total width of the control, always 100%. Nothing extends beyond this
  private totalWidth: number = 100;  

  // %age of width for the label
  private labelWidth: number = 10;

  private sliderWidth: number = this.totalWidth - (this.labelWidth * 2);
  
  constructor() { } 

  ngOnInit() {
    
  }

  
  doTest(): void {
    this.xPos += 10;
  }

  public getMinLabelXPos(): number {
    return this.getSliderStartPos();
    // return this.labelWidth / 2;
  } 

  public getMaxLabelXPos(): number {
    return this.getSliderEndPos(); // - (this.labelWidth / 2);
  } 

  public getMinMaxLabelWidth(): number {
    return this.labelWidth;
  } 

  public getMinMaxLabelYPos(): number {
    return 10;
  } 

  public getMinMaxLabelHeight(): number {
    return 5;
  } 

  public getAnswerLabelXPos(): number {
    return this.getPosAlongSlider(this.answer); 
  } 

  public getAnswerLabelYPos(): number {
    return 10;
  } 

  public getSliderStartPos(): number {
    return this.labelWidth;
  }

  public getSliderEndPos(): number {
    return this.labelWidth + this.sliderWidth;
  }

  public getSliderWidth(): number {
    return this.sliderWidth;
  }

  private getPosAlongSlider(logicalValue: number): number {
    return this.getSliderStartPos() + (logicalValue - this.min) / (this.max - this.min) * this.sliderWidth;
  }

  public getPotentialScoreVisibility(): boolean {
    return (this.showAnswer === false);
  }

  getLoXPos(): number {
    return this.getPosAlongSlider(this.lo);
  }

  getHiXPos(): number {
    return this.getPosAlongSlider(this.hi);
  }

  doCmd(cmd: string) {
    if(cmd === 'LN') {
      this.lo -= 1;  
    }
    if(cmd === 'LP') {
      this.lo += 1;    
    }
    if(cmd === 'RN') {
      this.hi -= 1;      
    }
    if(cmd === 'RP') {
      this.hi += 1;      
    }
    if(cmd === 'Answer') {
      this.showAnswer = !this.showAnswer; 
    //  this.animateProfile = !this.animateProfile;      
    }
    

  }

}
