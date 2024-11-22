import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { SwiperDirectiveDirective } from '../../../../shared/directives/swiper-directive.directive';
import { SwiperOptions } from 'swiper/types';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { environment } from '../../../../../environments/environment.development';
import { PropertyService } from '../../services/property.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

interface Card {
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-home-most-viewed',
  standalone: true,
  imports: [ButtonModule, Ripple, SwiperDirectiveDirective, AsyncPipe, CurrencyPipe],
  templateUrl: './home-most-viewed.component.html',
  styleUrl: './home-most-viewed.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeMostViewedComponent implements OnInit {
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
  // Tạo observable array mới and sắp xếp theo view giảm dần
  sortedProperties$ = this.propertyService.properties$.pipe(map((properties) => [...properties].sort((a, b) => b.viewCount - a.viewCount)));

  ngOnInit(): void {
    this.propertyService.getProperties('');
  }

  onBack() {
    this.swiperDirective?.swiperContainer.nativeElement.swiper.slidePrev();
  }

  onNext() {
    this.swiperDirective?.swiperContainer.nativeElement.swiper.slideNext();
  }

  navigateToPropertyDetail(propertyId: string) {
    this.router.navigate(['/property'], { queryParams: { propertyId: propertyId } });
  }
}
