import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faCheck, faBackspace } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-numpad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.scss']
})
export class NumpadComponent implements OnInit {

  /** number of digits in code, after which the "enter" button will be enabled */
  @Input() codeLength: number = 4;

  /** after how many chars to auto emit the text. 0 means don't */
  @Input() autoEnterLength: number = 0;

  @Output() textEntered = new EventEmitter<string>();

  public text: string = ' ';

  iconEnter = faCheck;
  iconBackSpace = faBackspace;

  constructor() { }

  ngOnInit() {
    this.text = ''; 
  }

  public pushButton(s: string): void {
    if (s == 'B') {
      if ( this.text.length > 0) {
        this.text = this.text.substr(0, this.text.length - 1);
      }     
      return;
    }
    if (s == 'E' && this.text.length > 0) {
      this.textEntered.emit(this.text);
      return;
    }
    this.text += s;
    
    if (this.autoEnterLength > 0 && this.text.length === this.autoEnterLength) {
      this.textEntered.emit(this.text);
    }
  }

  public reset(): void {
    this.text = '';
  }

  public isEnterDisabled(): boolean {
    if (this.codeLength === 0) {
      return false;
    }
    return (this.text.length !== this.codeLength);
  }

}
