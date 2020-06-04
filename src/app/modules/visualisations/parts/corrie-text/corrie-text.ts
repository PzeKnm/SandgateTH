import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-corrie-text',
  templateUrl: './corrie-text.html',
  styleUrls: ['./corrie-text.scss']
})
export class CorrieText implements OnInit, AfterViewInit {

  @Input() text: string;

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

  ngAfterViewInit() {
    console.log(this.elRef.nativeElement.parentNode);
   // let parentHeight = this.self.nativeElement.offsetParent.clientHeight;

  //  this.elementView.nativeElement.
  //  console.log(parentHeight);
}

  getViewbox(): string {
    const s = '0 0 ' + this.vbWidth + ' ' + this.vbHeight;
    return s
  }

  getTextX(): string {
    return (this.vbWidth / 2).toString();
  }


  getTextY(): string {
    return (this.vbHeight / 2).toString();
  }

  getPath(): string {

    const r = this.radius;
    const ht = this.strokeWidth / 2;
    const a = 'a' + r + ' ' + r + ' 0 0 1 ';
    const b = r - ht;

    const s = 'm' + r + ' ' + ht +
    a + (b * -1) + ' ' + (b * 1) + ' ' + 
    'v' + (this.vbHeight - (r * 2)) + 
    a + (b * 1) + ' ' + (b * 1) + ' ' + 
    'h' + (this.vbWidth - (r * 2)) + 
    a + (b * 1) + ' ' + (b * -1) + ' ' + 
    'v' + (this.vbHeight - (r * 2)) * -1 + 
    a + (b * -1) + ' ' + (b * -1) + ' ' + 
    'z'; 

/*
    const s2 = 'm5 0.5' + 
    'a5 5 0 0 1 -4.47 4.47' + 
    'v10.00' + 
    'a5 5 0 0 1  4.47 4.47' + 
    'h90.0' + 
    'a5 5 0 0 1  4.47-4.47' + 
    'v-10.0' + 
    'a5 5 0 0 1 -4.47-4.47' + 
    'z'; */
    return s;
  }

  getStrokeColour(): string {
    return this.strokeColour;
  }

  getFillColour(): string {
    return this.fillColour;
  }

  getStyle() {
    const fontSize = 'font-size.' + this.fontSizeUnit;
    const objRet = { };
    objRet[fontSize] = this.fontSize;
    return objRet;
  }

  
}
