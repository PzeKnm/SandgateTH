import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-answer-hint',
  templateUrl: './answer-hint.component.html',
  styleUrls: ['./answer-hint.component.scss']
})
export class AnswerHint implements OnInit {

  @Input() min: number;
  @Input() max: number;

  
  constructor() { } 

  ngOnInit() {
    
  }



}
