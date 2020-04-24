import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//// import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule } from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { SignalRService } from './services/signal-r.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { GuidService } from './services/guid.service';
import { AddHeaderInteceptorService } from './inteceptors/add-header-inteceptor.service';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
import { GameOverComponent } from './components/game-over/game-over.component';
import { PreGameComponent } from './components/pre-game/pre-game.component';
import { GameSummaryComponent } from './components/game-summary/game-summary.component';
import { FormsModule } from '@angular/forms';
import { NumpadComponent } from './components/numpad/numpad.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { VisualisationDataService, Question} from './services/visualisation-data.service';
import { VizViewComponent } from './views/viz-view/viz-view.component';
import { UiViewComponent } from './views/ui-view/ui-view.component';
import { HomeComponent } from './views/home/home.component';
import { MoreOrLessComponent } from './games/more-or-less/ui/more-or-less-ui/more-or-less.component';
import { MoreOrLessVizComponent } from './games/more-or-less/viz/more-or-less-viz/more-or-less-viz.component';
import { IntroPageComponent } from './games/more-or-less/viz/more-or-less-viz/pages/intro-page/intro-page.component';
import { AuthenticationPageComponent } from './games/more-or-less/viz/more-or-less-viz/pages/authentication-page/authentication-page.component';
import { PregamePageComponent } from './games/more-or-less/viz/more-or-less-viz/pages/pregame-page/pregame-page.component';
import { PlayingPageComponent } from './games/more-or-less/viz/more-or-less-viz/pages/playing-page/playing-page.component';
import { FinalPageComponent } from './games/more-or-less/viz/more-or-less-viz/pages/final-page/final-page.component';
import { MoreOrLessButton } from './games/more-or-less/parts/more-or-less-button/more-or-less-button';
import { RangeSelector } from './games/more-or-less/parts/range-selector/range-selector.component';
import { MinMaxLabel } from './games/more-or-less/parts/range-selector/parts/minmax-label.component';
import { AnswerLabel } from './games/more-or-less/parts/range-selector/parts/answer-label';
import { PotentialScore } from './games/more-or-less/parts/range-selector/parts/potential-score';
import { RangeMarker } from './games/more-or-less/parts/range-selector/parts/range-marker';
import { RangeMarkerSymbol } from './games/more-or-less/parts/range-selector/parts/range-marker-symbol';
import { Score } from './games/more-or-less/parts/score/score.component';
import { QuestionDisplay } from './games/more-or-less/parts/question-display/question-display.component';
import { AnswerHint } from './games/more-or-less/parts/answer-hint/answer-hint.component';
import { Countdown } from './games/more-or-less/parts/countdown/countdown.component';
import { MiniPhone } from './games/more-or-less/parts/mini-phone/mini-phone';
import { FlourishText } from './games/more-or-less/parts/flourish-text/flourish-text';
import { CorrieText } from './games/more-or-less/parts/corrie-text/corrie-text';
import { FrameText } from './games/more-or-less/parts/frame-text/frame-text';
import { GraphicDisplay } from './games/more-or-less/parts/graphic-display/graphic-display';
import { AccessCodeLoginView } from './views/access-code-login/access-code-login.component';
import { GameUIView } from './views/game-ui/game-ui.component';


@NgModule({
  declarations: [    
    AppComponent,
    HomeComponent,
    VizViewComponent,
    UiViewComponent, 
    AdminViewComponent,
    AccessCodeLoginView,
    GameUIView,

    AppFooterComponent,
    AppHeaderComponent,  
    AlertComponent,

  
    MoreOrLessComponent,
    MoreOrLessButton,
    GameOverComponent,
    PreGameComponent,
    GameSummaryComponent,
    NumpadComponent,
    MoreOrLessVizComponent,
    IntroPageComponent,
    AuthenticationPageComponent,
    PregamePageComponent,
    PlayingPageComponent,
    FinalPageComponent,
    RangeSelector,
    MinMaxLabel,
    AnswerLabel,
    PotentialScore,
    RangeMarker,
    RangeMarkerSymbol,
    Score,
    QuestionDisplay,
    AnswerHint,
    Countdown,
    MiniPhone,
    FlourishText,
    CorrieText, 
    FrameText,
    GraphicDisplay,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    /*MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,*/
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInteceptorService, multi: true },
    AlertService,
    SignalRService,
    VisualisationDataService,
    CookieService,
    GuidService   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
