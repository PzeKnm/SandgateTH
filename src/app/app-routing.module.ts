import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminViewComponent } from './views/admin-view/admin-view.component';
//import { VizViewComponent } from './views/viz-view/viz-view.component';
import { UiViewComponent } from './views/ui-view/ui-view.component';
import { HomeComponent } from './views/home/home.component';
////import { MoreOrLessVizComponent } from './games/more-or-less/viz/more-or-less-viz/more-or-less-viz.component';
import { AccessCodeLoginView } from './views/access-code-login/access-code-login.component';
import { GameUIView } from './views/game-ui/game-ui.component';

const routes: Routes = [ 
  { path: 'visualisations',     loadChildren: '../app/modules/visualisations/visualisations.module#VisualisationsModule' },  
 //// { path: 'MoreOrLessViz',        component: MoreOrLessVizComponent }, 
  { path: 'AccessCode/:GameId',   component: AccessCodeLoginView },
  { path: 'GameUI/:GameId',       component: GameUIView },  
  { path: 'admin',                component: AdminViewComponent },   
 // { path: 'viz',                  component: VizViewComponent },   
  { path: 'ui',                   component: UiViewComponent },      
  { path: '',                     component: HomeComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
