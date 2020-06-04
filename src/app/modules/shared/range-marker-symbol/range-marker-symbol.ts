import { Component, OnInit, Input } from '@angular/core';

// The ball that goes up and down the slider
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

  // whther the marker is for a min or a max
  @Input() isMin: boolean = false;

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

  public getFill(): string {
    if (this.isMin) {
      return 'url(#ShinyMin)';
    } else {
      return 'url(#ShinyMax)';
    }
  }


}
