import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[range-marker]',
  templateUrl: './range-marker.html',
  styleUrls: ['./range-marker.scss']
})
export class RangeMarker implements OnInit {

  // The position in svg coordinates
  @Input() position: number = 99;

  // The text for the label
  @Input() value: number = 99;

  // Whether the flag lies to the left or right
  @Input() flagLeft: boolean = true;

  // The position of the point that corresponds to the value. The
  // lable should be horizontally centred at this point, and offset above.
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() width: number = 10;
  @Input() height: number = 4;

  constructor() { } 

  ngOnInit() {
    
  }

  public getXPos(): number {
    return this.position;
  } 

  public getYPos(): number {
    return 10;
  } 

  public getFlagXPos(): number {
    if (this.flagLeft) {
      return this.getXPos() - 10;
    } else {
      return this.getXPos();
    }    
  } 

  public getFlagYPos(): number {
    return 15; 
  } 

  public getFlagWidth(): number {
    return this.width;
  }

  public getFlagHeight(): number {
    return this.height;
  }
  
  public getTextXPos(): number {
    return this.getFlagXPos() + (this.width / 2);
  } 

  public getTextYPos(): number {
    return this.getFlagYPos() + (this.height / 2);;
  } 


}
