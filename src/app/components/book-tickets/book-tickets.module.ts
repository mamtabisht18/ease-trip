import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

import { BookTicketsComponent } from './book-tickets.component';
import { SelectSeatsModule } from './components/select-seats/select-seats.module';
import { BookedTicketDialogModule } from '../booked-ticket-dialog/booked-ticket-dialog.module';

@NgModule({
  declarations: [
    BookTicketsComponent
  ],
  imports: [
    BookedTicketDialogModule,
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    SelectSeatsModule,
  ],
  exports: [BookTicketsComponent]
})
export class BookTicketsModule { }
