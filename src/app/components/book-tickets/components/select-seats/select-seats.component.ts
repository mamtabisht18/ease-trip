import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChildren } from '@angular/core';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-select-seats',
  templateUrl: './select-seats.component.html',
  styleUrls: ['./select-seats.component.scss'],
})
export class SelectSeatsComponent implements OnInit {
  @ViewChildren('seats') seatSpan: QueryList<ElementRef> =
    {} as QueryList<ElementRef>;
  selectedSeatList$ = this.bookingService.selectedSeatList$;
  tempSelectedSeatList$ = this.bookingService.tempSelectedSeatList$;
  seatSelectionNumber$ = this.bookingService.seatSelectionNumber$;
  @Output() seatChange = new EventEmitter();

  constructor(
    private renderer: Renderer2,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.bookingService.seatsConfirmed$.subscribe((value) => 
    {
      this.enableSeats();
      this.updateConfirmSeats();
    });
  }

  isSelected(i: number, j: number, temp: boolean): boolean {
    if (temp === true) {
      return this.tempSelectedSeatList$.getValue().includes(i * 3 + j);
    } else {
      return this.selectedSeatList$.getValue().includes(i * 3 + j);
    }
  }

  onSelectSeat(i: number, j: number): void {
    if (this.seatSelectionNumber$.getValue() <= 6) {
      this.bookingService.updateSelectionNumber();
      this.bookingService.updateTempSelectedSeat(i * 3 + j);
      this.seatChange.next(this.tempSelectedSeatList$.getValue());
      this.updatedSeats();
    }
    if (this.seatSelectionNumber$.getValue() >= 6) {
      this.disableAllSeats();
    }
  }

  updatedSeats(): void {
    this.seatSpan.forEach((elementRef) => {
      const innerValue = +elementRef.nativeElement.innerText;
      if (this.tempSelectedSeatList$.getValue().includes(innerValue)) {
        this.renderer.setAttribute(
          elementRef.nativeElement,
          'class',
          'temp-selected'
        );
      }
    });
  }

  disableAllSeats(): void {
    this.seatSpan.forEach((elementRef) => {
      const innerValue = +elementRef.nativeElement.innerText;
      if (!this.tempSelectedSeatList$.getValue().includes(innerValue)) {
        this.renderer.addClass(elementRef.nativeElement, 'seat-disabled');
      }
    });
  }

  enableSeats(): void {
    this.seatSpan.forEach((elementRef) => {
      const innerValue = +elementRef.nativeElement.innerText;
      if (!this.tempSelectedSeatList$.getValue().includes(innerValue)) {
        this.renderer.removeClass(elementRef.nativeElement, 'seat-disabled');
      }
    });
  }

  updateConfirmSeats(): void {
    this.seatSpan.forEach((elementRef) => {
      const innerValue = +elementRef.nativeElement.innerText;
      if (this.selectedSeatList$.getValue().includes(innerValue)) {
        this.renderer.addClass(elementRef.nativeElement, 'selected');
      }
    });
  }
}

