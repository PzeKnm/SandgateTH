import { Component, OnInit, Input } from '@angular/core';
import { VisualisationData } from 'src/app/services/visualisation-data.service';

@Component({
  selector: 'app-playing-page',
  templateUrl: './playing-page.component.html',
  styleUrls: ['./playing-page.component.scss']
})
export class PlayingPageComponent implements OnInit {

  @Input() vizData: VisualisationData | undefined = undefined;
  
  constructor() { }

  ngOnInit() {
  }

  incScore() {
    this.vizData.score++;
  }

  changeQuestion() {
    this.vizData.currentQuestion.questionText = 
      this.vizData.currentQuestion.questionText + 'foo';  
  }

}
