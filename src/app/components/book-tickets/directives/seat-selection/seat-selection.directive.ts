import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSeatSelection]',
})
export class SeatSelectionDirective {
  @HostListener('mouseenter') onMouseEnter() {
    this.fillBox('lightblue');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.fillBox('blue');
  }
  constructor(private el: ElementRef) {}

  private fillBox(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
