import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeatSelectionDirective } from './seat-selection.directive';

@NgModule({
  declarations: [SeatSelectionDirective],
  imports: [
    CommonModule
  ],
  exports: [SeatSelectionDirective]
})
export class SeatSelectionModule { }
