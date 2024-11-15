import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { SwiperDirectiveDirective } from '../../../../shared/directives/swiper-directive.directive';
import { SwiperOptions } from 'swiper/types';

interface Card {
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-home-most-viewed',
  standalone: true,
  imports: [ButtonModule, Ripple, SwiperDirectiveDirective],
  templateUrl: './home-most-viewed.component.html',
  styleUrl: './home-most-viewed.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeMostViewedComponent {
  @ViewChild(SwiperDirectiveDirective) swiperDirective?: SwiperDirectiveDirective;

  swiperConfig: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 16,
    autoplay: { delay: 1500 },
    loop: true,
    autoHeight: true,
  };

  contents: Card[] = [
    {
      title: 'Computer',
      description: 'Description about computer...',
      url: 'https://picsum.photos/id/1/640/480',
    },
    {
      title: 'Building',
      description: 'Building description...',
      url: 'https://picsum.photos/id/101/640/480',
    },
    {
      title: 'Glass over a computer',
      description: 'Description of a glass over a computer',
      url: 'https://picsum.photos/id/201/640/480',
    },
    {
      title: 'Autumn',
      description: 'Description about autumn leaves',
      url: 'https://picsum.photos/id/301/640/480',
    },
    {
      title: 'Balloon',
      description: 'Coloured balloon',
      url: 'https://picsum.photos/id/401/640/480',
    },
  ];

  onBack() {
    this.swiperDirective?.swiperContainer.nativeElement.swiper.slidePrev();
  }

  onNext() {
    this.swiperDirective?.swiperContainer.nativeElement.swiper.slideNext();
  }
}
