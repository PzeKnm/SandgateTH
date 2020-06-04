import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { UiViewComponent } from './views/ui-view/ui-view.component';
import { HomeComponent } from './views/home/home.component';
import { MoreOrLessComponent } from './games/more-or-less/ui/more-or-less-ui/more-or-less.component';
import { AccessCodeLoginView } from './views/access-code-login/access-code-login.component';
import { GameUIView } from './views/game-ui/game-ui.component';
import { GlobalErrorHandler } from './services/global-error-handler';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [    
    AppComponent,
    HomeComponent,
    UiViewComponent, 
    AdminViewComponent,
    AccessCodeLoginView,
    GameUIView,
    AppFooterComponent,
    AppHeaderComponent,  
    AlertComponent,  
    MoreOrLessComponent,   
    GameOverComponent,
    PreGameComponent,
    GameSummaryComponent,
    NumpadComponent,
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInteceptorService, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler},
    AlertService,
    SignalRService,
    VisualisationDataService,
    CookieService,
    GuidService   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
