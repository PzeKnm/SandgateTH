import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualisationsRoutingModule } from './visualisations-routing.module';
import { TestVisualisationComponent } from './test-visualisation/test-visualisation.component';
import { MoreOrLessVizComponent } from './more-or-less-viz/more-or-less-viz.component';
import { SharedModule } from '../shared/shared.module';
import { IntroPageComponent } from './more-or-less-viz/intro-page/intro-page.component';
import { AuthenticationPageComponent } from './more-or-less-viz/authentication-page/authentication-page.component';
import { GraphicDisplay } from './parts/graphic-display/graphic-display';
import { MiniPhone } from './parts/mini-phone/mini-phone';
import { FlourishText } from './parts/flourish-text/flourish-text';
import { RangeSelector } from './parts/range-selector/range-selector.component';
import { MinMaxLabel } from './parts/range-selector/parts/minmax-label.component';
import { AnswerLabel } from './parts/range-selector/parts/answer-label';
import { PotentialScore } from './parts/range-selector/parts/potential-score';
import { RangeMarker } from './parts/range-selector/parts/range-marker';
import { PregamePageComponent } from './more-or-less-viz/pregame-page/pregame-page.component';
import { PlayingPageComponent } from './more-or-less-viz/playing-page/playing-page.component';
import { FinalPageComponent } from './more-or-less-viz/final-page/final-page.component';
import { QuestionDisplay } from './parts/question-display/question-display.component';
import { AnswerHint } from './parts/answer-hint/answer-hint.component';
import { CorrieText } from './parts/corrie-text/corrie-text';

@NgModule({
  declarations: [
    TestVisualisationComponent,
    MoreOrLessVizComponent,
    IntroPageComponent,
    AuthenticationPageComponent,
    PregamePageComponent,
    PlayingPageComponent,
    FinalPageComponent,
    GraphicDisplay,
    MiniPhone,
    FlourishText,
    RangeSelector,
    MinMaxLabel,
    AnswerLabel,
    PotentialScore,
    RangeMarker,
    QuestionDisplay,
    AnswerHint,
    CorrieText,
  ],
  imports: [
    CommonModule,
    VisualisationsRoutingModule,
    SharedModule    
  ],
  exports: [
    IntroPageComponent,
    AuthenticationPageComponent,
    PregamePageComponent,
    PlayingPageComponent,
    FinalPageComponent,
  ],
  entryComponents: [
    
  ]
})
export class VisualisationsModule { }
