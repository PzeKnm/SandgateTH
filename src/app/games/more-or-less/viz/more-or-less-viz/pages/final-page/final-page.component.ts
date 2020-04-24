import { Component, OnInit, Input } from '@angular/core';
import { VisualisationData } from 'src/app/services/visualisation-data.service';

@Component({
  selector: 'app-final-page',
  templateUrl: './final-page.component.html',
  styleUrls: ['./final-page.component.scss']
})
export class FinalPageComponent implements OnInit {

  @Input() vizData: VisualisationData | undefined = undefined;
  
  constructor() { }

  ngOnInit() {
  }


  getScoreCommentary(): string {
    return 'Not Bad....';
  }



}
