import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameText } from './frame-text/frame-text';
import { Countdown } from './countdown/countdown.component';
import { MoreOrLessButton } from './more-or-less-button/more-or-less-button';
import { Score } from './score/score.component';
import { RangeMarkerSymbol } from './range-marker-symbol/range-marker-symbol';

@NgModule({
  declarations: [
    FrameText,
    Countdown,
    MoreOrLessButton,
    Score,
    RangeMarkerSymbol,
  ],
  exports: [
    FrameText,
    Countdown,
    MoreOrLessButton,
    Score,
    RangeMarkerSymbol,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
