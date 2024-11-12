import { AfterViewInit, Directive, ElementRef, inject, Input } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { SwiperContainer } from 'swiper/element';

@Directive({
  selector: '[appSwiperDirective]',
  standalone: true,
})
export class SwiperDirectiveDirective implements AfterViewInit {
  @Input() swiperConfig?: SwiperOptions;
  public swiperContainer = inject(ElementRef<SwiperContainer>);

  ngAfterViewInit(): void {
    Object.assign(this.swiperContainer.nativeElement, this.swiperConfig);
    this.swiperContainer.nativeElement.initialize();
  }
}
