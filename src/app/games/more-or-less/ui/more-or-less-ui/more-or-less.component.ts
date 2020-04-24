import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-more-or-less',
  templateUrl: './more-or-less.component.html',
  styleUrls: ['./more-or-less.component.scss']
})
export class MoreOrLessComponent implements OnInit {

  @Input() score: number = 0;
  
  @Output() command = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  doCommand(cmd: string): void {
    this.command.emit(cmd);
  }
}
