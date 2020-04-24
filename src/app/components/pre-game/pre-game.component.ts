import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pre-game',
  templateUrl: './pre-game.component.html',
  styleUrls: ['./pre-game.component.scss']
})
export class PreGameComponent implements OnInit {

  @Output() command = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {
  }

  doCommand(cmd: string): void {
    this.command.emit(cmd);
  }
}
