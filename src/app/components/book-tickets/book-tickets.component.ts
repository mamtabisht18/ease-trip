import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from './services/booking.service';

@Component({
  selector: 'app-book-tickets',
  templateUrl: './book-tickets.component.html',
  styleUrls: ['./book-tickets.component.scss'],
})
export class BookTicketsComponent implements OnInit {
  form: FormGroup = {} as FormGroup;
  seatsSelected: number[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(/[0-9]{10}/),
      ]),
    });
  }

  onConfirm(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    this.bookingService.confirmSeats(this.form.value);
    this.form.reset();
  }

  onSeatChange(list: number[]): void {
    this.seatsSelected = list;
  }
}
