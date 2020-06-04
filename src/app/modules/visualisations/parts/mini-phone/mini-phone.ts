import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mini-phone',
  templateUrl: './mini-phone.html',
  styleUrls: ['./mini-phone.scss']
})
export class MiniPhone implements OnInit {

  @Input() showKeyPad: boolean = false;
  @Input() showStartButton: boolean = false;
  @Input() showSliderButtons: boolean = false;

  constructor() { } 

  ngOnInit() {
    
  }

  getKeyPadVisibility(): string {
    if(this.showKeyPad) {
      return 'inline';
    }
    return 'none';
  }

  getStartButtonVisibility(): string {
    if(this.showStartButton) {
      return 'inline';
    }
    return 'none';
  }

  getSliderButtonsVisibility(): string {
    if(this.showSliderButtons) {
      return 'inline';
    }
    return 'none';
  }




}
