import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestVisualisationComponent } from './test-visualisation/test-visualisation.component';
import { MoreOrLessVizComponent } from './more-or-less-viz/more-or-less-viz.component';

const routes: Routes = [
  { path: 'MoreOrLessViz',  component: MoreOrLessVizComponent }, 
  { path: 'TestViz',        component: TestVisualisationComponent },  
  { path: '', component: TestVisualisationComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualisationsRoutingModule { }
