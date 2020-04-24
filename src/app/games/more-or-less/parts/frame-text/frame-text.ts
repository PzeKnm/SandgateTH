import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-frame-text',
  templateUrl: './frame-text.html',
  styleUrls: ['./frame-text.scss']
})
export class FrameText implements OnInit, AfterViewInit {
/*
  @Input() text: string;

  @Input() fontSize: number = 1;
  @Input() fontSizeUnit: string = 'vh';  
*/
  // enables having more than one instance on same page
  private instanceId: string = Math.floor((Math.random() * 1000000)).toString();  

  // view box height
  @Input() vbHeight: number = 20;
  
  // view box width
  @Input() vbWidth: number = 100;

  // for border
  @Input() strokeWidth: number = 1;

  // for border
  @Input() strokeColour: string = '#000'; 
  
  @Input() fillColour: string = '#fff'; 

  @Input() frameType: string = 'chamfer'; 
 

  @Input() radius: number = 5;

  @ViewChild("self")
  self: ElementRef;

  parentHeight: number = 100;
  parentWidth: number = 100;

  cornerSize: number;
  
  constructor(private elRef:ElementRef) { } 

  ngOnInit() {
    this.parentHeight = this.elRef.nativeElement.parentNode.clientHeight;
    this.parentWidth = this.elRef.nativeElement.parentNode.clientWidth;
    this.cornerSize = this.parentHeight / 10;   
  }

  ngAfterViewInit() {

  }

  getViewbox(): string {
    const s = '0 0 ' + this.parentWidth + ' ' + this.parentHeight;
    return s
  }

  getPath(): string {
    let s = '';

    if (this.frameType === 'chamfer') {
      const c = this.cornerSize;
      const h = this.parentHeight;
      const w = this.parentWidth;
      const ht = this.strokeWidth / 2;

      s = 'M' + c + ' 0' +
      'L' + (w - c) + ' 0' +
      'L' + w       + ' ' + c + 
      'L' + w       + ' ' + (h - c) + 
      'L' + (w - c) + ' ' + h + 
      'L' + c + ' ' + h + 
      'L' + 0 + ' ' + (h - c) + 
      'L' + 0 + ' ' + c + 
      'Z'; 
    }
    
    return s;
  }

  getStrokeColour(): string {
    return this.strokeColour;
  }

  getFillColour(): string {
    return this.fillColour;
  }
 
  getId(): string { 
    return (Math.random() * 1000000).toString();
  }

  getCheckerplateId(): string { 
    return 'checkerplate_' + this.instanceId;
  }

  getCheckerplateColourA(): string { 
    return '#c8beb7';
  } 

  getCheckerplateColourB(): string { 
    return '#ac9d93';
  } 


  getFill(): string { 
    // return  this.fillColour; //   'url(#checker-plate)';
    return 'url(#' + this.getCheckerplateId() + ')';
  }

  /*
  getStyle() {
    const fontSize = 'font-size.' + this.fontSizeUnit;
    const objRet = { };
    objRet[fontSize] = this.fontSize;     
    return objRet;
  }
*/

}
