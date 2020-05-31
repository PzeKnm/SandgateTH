import { Component, OnInit, EventEmitter, Output, Input, ViewEncapsulation } from '@angular/core';



@Component({
  selector: 'app-more-or-less-button',
  templateUrl: './more-or-less-button.html',
  styleUrls: ['./more-or-less-button.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MoreOrLessButton implements OnInit {

  // The command string that is emitted when the button is pushed.
  // 'DecLo' 'IncLo' 'DecHi' 'IncHi'
  @Input() type: string;

  @Input() size: string = '10vw';

  @Input() isMin: boolean = true;
  
  @Output() command = new EventEmitter<string>();
  constructor() { }  

  ngOnInit() {
  }

  doCommand(cmd: string): void {
    this.command.emit(cmd);
  }

  public getPoints(): string {
    if (this.type == 'DecLo' || this.type == 'DecHi') {
      return '30,50 60,30 60,70';
    }
    if (this.type == 'IncLo' || this.type == 'IncHi') {
      return '70,50 40,30 40,70';
    }
   
    return '30,50 60,30 60,70';
  }

  public getRectX(): number {
    if (this.type == 'DecLo' || this.type == 'IncLo') {
      return 50;
    }
    return 0;   
  }



  /*
  getStyle(): string {
    const s = 'height:' + this.size + '; width: ' + this.size;
    return s;
  }*/


}
