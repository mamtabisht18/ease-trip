import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-booked-ticket-dialog',
  templateUrl: './booked-ticket-dialog.component.html',
  styleUrls: ['./booked-ticket-dialog.component.scss'],
})
export class BookedTicketDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: User) {}

  ngOnInit(): void {}
}
