import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Users } from '../../../models/users.model';
import { BookedTicketDialogComponent } from '../../booked-ticket-dialog/booked-ticket-dialog.component';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  selectedSeatList$ = new BehaviorSubject<number[]>([]);
  tempSelectedSeatList$ = new BehaviorSubject<number[]>([]);
  seatSelectionNumber$ = new BehaviorSubject<number>(0);
  users$ = new BehaviorSubject<Users>({});
  seatsConfirmed$ = new EventEmitter<number[]>();

  constructor(public dialog: MatDialog) {}

  confirmSeats(params: { mobile: string; date: Date }): void {
    if (
      this.checkSeatsAvailabilityAndUpdate(
        params,
        this.tempSelectedSeatList$.getValue()
      )
    ) {
      const confirmSeat = this.selectedSeatList$.getValue();

      confirmSeat.push(...this.tempSelectedSeatList$.getValue());
      this.selectedSeatList$.next(confirmSeat);
      this.tempSelectedSeatList$.next([]);
      this.seatSelectionNumber$.next(0);
      this.seatsConfirmed$.emit(confirmSeat);
    }
  }

  updateSelectionNumber(): void {
    let num = this.seatSelectionNumber$.getValue();

    num++;
    this.seatSelectionNumber$.next(num);
  }

  updateTempSelectedSeat(seatNumber: number): void {
    const temp = this.tempSelectedSeatList$.getValue();

    temp.push(seatNumber);
    this.tempSelectedSeatList$.next(temp);
  }

  checkSeatsAvailabilityAndUpdate(
    form: { mobile: string; date: Date },
    seatList: number[]
  ): boolean {
    const users = this.users$.getValue();
    const uniqueId =`${form.mobile}-${form.date.getDate()}${form.date.getMonth()}${form.date.getFullYear()}`;
    const fetchedUser = users[uniqueId];
    if (fetchedUser) {
      if (fetchedUser.numberOfSeatsConfirmed + seatList.length > 6) {
        window.confirm(
          'Seats allocated cannot be more than 6 for single user in a day'
        );
        return false;
      }
      const seats = fetchedUser.seats;
      seats.push(...seatList);
      users[uniqueId] = {
        ...fetchedUser,
        numberOfSeatsConfirmed:
          fetchedUser.numberOfSeatsConfirmed + seatList.length,
        seats,
      };
      return true;
    }
    users[uniqueId] = {
      id: uniqueId,
      mobile: form.mobile,
      date: form.date,
      seats: seatList,
      numberOfSeatsConfirmed: seatList.length,
    };
    this.users$.next(users);
    this.openDialog(users[uniqueId]);
    return true;
  }

  openDialog(user: User) {
    this.dialog.open(BookedTicketDialogComponent, {
      data: user
    });
  }
}
