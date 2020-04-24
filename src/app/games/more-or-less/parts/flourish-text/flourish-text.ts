import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-flourish-text',
  templateUrl: './flourish-text.html',
  styleUrls: ['./flourish-text.scss']
})
export class FlourishText implements OnInit {

  @Input() flourishStyle: string;
  
  constructor() { } 

  ngOnInit() {
    
  }




}
