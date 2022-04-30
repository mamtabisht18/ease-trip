import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTicketDialogComponent } from './booked-ticket-dialog.component';

describe('BookedTicketDialogComponent', () => {
  let component: BookedTicketDialogComponent;
  let fixture: ComponentFixture<BookedTicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedTicketDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
