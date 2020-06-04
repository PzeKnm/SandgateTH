import { Component, OnInit } from '@angular/core';
import { VisualisationDataService, VisualisationData } from 'src/app/services/visualisation-data.service';
import { environment } from 'src/environments/environment';

export enum ActivePage {
  None,
  Intro,
  Authentication,
  PreGame,
  Playing,
  Final
}




@Component({
  selector: 'app-more-or-less-viz',
  templateUrl: './more-or-less-viz.component.html',
  styleUrls: ['./more-or-less-viz.component.scss']
})
export class MoreOrLessVizComponent implements OnInit { 

  isConnected: boolean = false;
  vizData: VisualisationData | undefined = undefined;

  constructor(private vizSrv: VisualisationDataService) {
    console.log('ctor');
   }
 
  ngOnInit() {

    this.vizSrv.isConnected$.subscribe(connected => this.isConnected = connected);
    this.vizSrv.incomingData$.subscribe(data => this.handleIncomingData(data));
    this.vizSrv.initialise();
  }


  handleIncomingData(viz: VisualisationData): void {
    this.vizData = viz; 
  }

  isActivePage(pg: string): boolean {
    if(this.vizData === undefined) {
      return false;
    }
    return (this.vizData.gameState === pg);
  }

  getActivePage(): ActivePage {

    if(this.vizData.gameState === "Initialised") {
      return ActivePage.Intro;
    }

    if(this.vizData.gameState === "Activated") {
      return ActivePage.Intro;
    }

    if(this.vizData.gameState === "Online") {
      return ActivePage.Intro;
    }

    if(this.vizData.gameState === "Authenticating") {
      return ActivePage.Authentication;
    }

    if(this.vizData.gameState === "PreGame") {
      return ActivePage.PreGame;
    }

    if(this.vizData.gameState === "GamePlaying") {
      return ActivePage.Playing;
    }

    if(this.vizData.gameState === "PostGame") {
      return ActivePage.Final;
    }

    return ActivePage.None;
  }

  getBuildTimeStamp(): string {
    return environment.timeStamp;
  }

  
}


/*


  if(m_visData.GameState == "GamePlaying")
  {
    if(nCurrentIndex != 3)
    {
      m_pPlayingPage->Initialise();
    }
    ui->stackedWidget->setCurrentIndex(3);
    m_pPlayingPage->Data2Gui(&m_visData);
  }

  if(m_visData.GameState == "PostGame")
  {
    ui->stackedWidget->setCurrentIndex(4);
  }


*/

