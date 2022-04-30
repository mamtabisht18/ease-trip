import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { BookingService } from '../book-tickets/services/booking.service';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.scss'],
})
export class ListTicketsComponent implements OnInit {
  dataSource: User[] = [];
  displayedColumns: string[] = ['sequence', 'id', 'mobile', 'date', 'seats'];
  form: FormGroup = {} as FormGroup;
  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
    });
  }

  onSearch(): void {
    const searchDate = this.form.value.date;
    const usersObj = this.bookingService.users$.getValue();
    const usersList = Object.values(usersObj);
    this.dataSource = usersList.filter((user) => {
      return (
        user.id.split('-')[1] ===
        `${searchDate.getDate()}${searchDate.getMonth()}${searchDate.getFullYear()}`
      );
    }).map((user, index) => {
      return {
        ...user,
        sequence: index+1
      }
    }).sort((a, b) => {
      for(let i  = 0; i < a.seats.length; i++) {
        for (let j = 0; j < b.seats.length; j++) {
          if (a.seats[i] < b.seats[j]) {
            return -1;
          }
          return 1;
        }
      }
      return 1;
    });
  }
}
