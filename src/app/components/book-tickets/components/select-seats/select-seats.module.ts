import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectSeatsComponent } from './select-seats.component';
import { SeatSelectionModule } from '../../directives/seat-selection/seat-selection.module';

@NgModule({
  declarations: [SelectSeatsComponent],
  imports: [CommonModule, SeatSelectionModule],
  exports: [SelectSeatsComponent],
})
export class SelectSeatsModule {}
