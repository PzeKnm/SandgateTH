import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[minmax-label]',
  templateUrl: './minmax-label.component.html',
  styleUrls: ['./minmax-label.component.scss']
})
export class MinMaxLabel implements OnInit {

  // The text for the label
  @Input() value: number = 99;

  // The position of the point that corresponds to the value. The
  // lable should be horizontally centred at this point, and offset above.
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() width: number = 9;
  @Input() height: number = 9;

  // Whether the flag lies to the left or right
  @Input() flagLeft: boolean = true;

  constructor() { } 

  ngOnInit() {
    
  }

  public getRectXPos(): number {

    if (this.flagLeft) {
      return this.x - this.width
    } else {
      return this.x;
    } 

  } 




  public getTextXPos(): number {
    if (this.flagLeft) {
      return this.x - (this.width / 2)
    } else {
      return this.x + (this.width / 2)
    } 
  } 

  public getTextYPos(): number {
    return this.y - this.height + (this.height / 4);
  } 

  public getPoints(): string {
    let side = 1;
    if (this.flagLeft) {
      side = -1;
    }

    const x = this.x;
    const y = this.y; 
    const w = this.width;
    const h = this.height;
    const p = 0.15;  

    const s: string = 
       x.toString() + ',' + y.toString() + ' ' + 
       x.toString() + ',' + (y - h).toString() + ' ' +
       (x + (w * side)).toString() + ',' + (y - h).toString() + ' ' +
       (x + (w * side)).toString() + ',' + (y - (h / 2)).toString() + ' ' +
       (x + ((w * p) * side)).toString() + ',' + (y - (h / 2)).toString() + ' ' +
       x.toString() + ',' + this.y.toString() + ' ';
    return s;
  }


}
