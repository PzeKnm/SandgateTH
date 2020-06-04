import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[potential-score]',
  templateUrl: './potential-score.html',
  styleUrls: ['./potential-score.scss']
})
export class PotentialScore implements OnInit {

  // The text for the label
  @Input() value: number = 99;

  // The position of the point that corresponds to the value. The
  // lable should be horizontally centred at this point, and offset above.
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() width: number = 10;
  @Input() height: number = 8;
  @Input() visible: boolean = false;

  opacityValue: number = 0.5;



  constructor() { } 

  ngOnInit() {
    
  }

  public getRectXPos(): number {
    return this.x - (this.width / 2);
  } 

  public getRectYPos(): number {
    return this.y - 5;
  } 


  public getTextXPos(): number {
    return this.x; //  + (this.width / 2);
  } 

  public getTextYPos(): number {
    return this.y;
  } 

  public getPoints(): string {
    const s: string = 
       this.x.toString() + ',' + this.y.toString() + ' ' + 
       (this.x - 1).toString() + ',' + (this.y - 4).toString() + ' ' +  
       (this.x + 1).toString() + ',' + (this.y - 4).toString() + ' ';
    return s;
  }


}
