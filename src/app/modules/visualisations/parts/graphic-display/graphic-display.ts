import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-graphic-display',
  templateUrl: './graphic-display.html',
  styleUrls: ['./graphic-display.scss']
})
export class GraphicDisplay implements OnInit {

  // "HandLeft", "HandRight", "HandUp", "HandDown"
  @Input() picture: string;

  @Input() fontSize: number = 1;
  @Input() fontSizeUnit: string = 'vh';  

  @Input() vbHeight: number = 20;
  
  @Input() vbWidth: number = 100;

  @Input() radius: number = 5;

  @Input() strokeWidth: number = 1;  

  @Input() strokeColour: string = '#000'; 

  @Input() fillColour: string = '#c8beb7';  

  @ViewChild("self")
  self: ElementRef;
  
  constructor(private elRef:ElementRef) { } 

  ngOnInit() {
    
  }

  getTransform(): string {

    if (this.picture === 'HandLeft') {
      return 'rotate(-90 50 50)';
    }

    if (this.picture === 'HandRight') {
      return 'rotate(90 50 50) scale(-1, 1) translate(-100, 0) ';
    }

    if (this.picture === 'HandDown') {
      return 'rotate(180 50 50)';
    }

    return '';
  }

  getViewbox(): string {
    return '0 0 100 100'; // '0 0 24 50'
  }



  
}
