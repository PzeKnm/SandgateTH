import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[range-marker-symbol]',
  templateUrl: './range-marker-symbol.html',
  styleUrls: ['./range-marker-symbol.scss']
})
export class RangeMarkerSymbol implements OnInit {

  // The position in svg coordinates
  @Input() position: number = 99;

  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() radius: number = 10;

  constructor() { } 

  ngOnInit() {
    
  }

  public getXPos(): number {
    return this.x;
  } 

  public getYPos(): number {
    return this.y;
  } 

  public getRadius(): number {
    return this.radius;
  } 


}
