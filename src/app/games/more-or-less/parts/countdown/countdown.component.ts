import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class Countdown implements OnInit {

  @Input() totalSecs: number = 60;
  @Input() remainingSecs: number = 0;
  @Input() remainingQuestionSecs: number = 0;

  // The Height of the control
  public controlHeight: number = 10;
  public controlWidth: number = 500;

  // The "dead space" at the terminus of each end
  public endcapRadius: number = (this.controlHeight / 2);

  // The width of the perimeter
  public strokeWidthOutline = 1.0;

  // The width of the "remaining" bar
  public strokeWidthRemaining = 0.0;
  
  constructor() { } 

  ngOnInit() {
    
  }

  getViewbox(): string {
    return '0, 0, ' + this.controlWidth.toString() + ', ' + this.controlHeight.toString();
  }

  getRealWorldBarLength(value: number): number {
    const effectiveWidth = (this.controlWidth - (this.endcapRadius * 2));
    let val = (effectiveWidth / this.totalSecs) * value;
    if(val < 0) {
      val = 0;
    }
    return val;
  }

  // returns the length of the bar that represents the remaininf seconds
  getRemainingWidth(): number {
    return this.getRealWorldBarLength(this.remainingSecs);
  }

  getQuestionXPos(): number {
    let pos = this.getRealWorldBarLength(this.remainingSecs - this.remainingQuestionSecs);
    if(pos < 0) {
      pos = 0;
    }
    return pos;
  }

  getQuestionWidth(): number {
    return this.getRealWorldBarLength(this.remainingQuestionSecs);    
  }


  
  getOutlinePath(): string {
    const offset = (this.controlHeight / 2);
    return this.getOvalPath(offset, 
      this.strokeWidthOutline, 0, this.controlWidth - (this.endcapRadius * 2));
  }


  getRemainingTotalPath(): string {
    const offset = (this.controlHeight / 2) - this.strokeWidthOutline;
    return this.getOvalPath(offset, this.strokeWidthRemaining, 0, this.getRemainingWidth());
  }

  getRemainingQuestionPath(): string {
    const offset = (this.controlHeight / 2) - this.strokeWidthOutline;
    return this.getOvalPath(offset, this.strokeWidthRemaining, 
      this.getQuestionXPos(), this.getQuestionWidth());
  }
  


  // The centre of the half cicles is always (5, 5) and (95, 5).
  // perimeterOffset is the distance from the middle (y = 5) to the outside of the stroke.
  // strokeWidth will be drawn inside of the perimeter
  // length excludes 2 radii, so length should be > 0 and < 90
  getOvalPath(perimeterOffset: number, strokeWidth: number, start: number, length: number): string {
    
    if(length === 0) {
      return '';
    }

    const ht = (this.endcapRadius - perimeterOffset) + strokeWidth / 2;
    const r = perimeterOffset - (strokeWidth / 2);
    const aStub = ' A ' + r + ',' + r + ' 0 0 0 ';
    const l = length; 

    const s = 'M ' + (start + this.endcapRadius).toString() + ',' + ht +
    aStub + ' ' +    (start + ht).toString() + ',5' +
    aStub + ' ' +    (start + 5).toString()  + ',' + (10 - ht).toString() +
    ' H ' +          (start + this.endcapRadius + l).toString() + 
    aStub + ' ' +    (start + this.endcapRadius +l + r).toString() + ',5' +
    aStub + ' ' +    (start + this.endcapRadius +l).toString() + ',' + ht +
    ' Z';  

    return s;  
  }





}
