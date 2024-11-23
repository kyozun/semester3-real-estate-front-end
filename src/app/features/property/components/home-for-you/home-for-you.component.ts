import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, ViewChild } from '@angular/core';
import { Button } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AsyncPipe, CurrencyPipe, NgForOf, NgStyle } from '@angular/common';
import { SwiperDirectiveDirective } from '../../../../shared/directives/swiper-directive.directive';
import { SwiperOptions } from 'swiper/types';
import { Observable } from 'rxjs';
import { Property } from '../../models/property';
import { PropertyService } from '../../services/property.service';
import { environment } from '../../../../../environments/environment.development';
import { Router, RouterLink } from '@angular/router';

interface Card {
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-home-for-you',
  standalone: true,
  imports: [Button, Ripple, NgForOf, SwiperDirectiveDirective, NgStyle, AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: './home-for-you.component.html',
  styleUrl: './home-for-you.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeForYouComponent implements OnInit {
  @ViewChild(SwiperDirectiveDirective) swiperDirective?: SwiperDirectiveDirective;
  swiperConfig: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 16,
    autoplay: { delay: 1500 },
    loop: true,
    autoHeight: true,
  };

  protected readonly environment = environment;
  private router = inject(Router);
  private propertyService = inject(PropertyService);
  properties$: Observable<Property[]> = this.propertyService.getProperties$();

  onBack() {
    this.swiperDirective?.swiperContainer.nativeElement.swiper.slidePrev();
  }

  onNext() {
    this.swiperDirective?.swiperContainer.nativeElement.swiper.slideNext();
  }

  ngOnInit(): void {
   this.propertyService.getProperties('');
  }

  navigateToPropertyDetail(propertyId: string) {
    this.router.navigate(['/property'], { queryParams: { propertyId: propertyId } });
  }
}
