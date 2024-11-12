import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Button } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { NgForOf, NgStyle } from '@angular/common';
import { SwiperDirectiveDirective } from '../directives/swiper-directive.directive';
import { SwiperOptions } from 'swiper/types';

interface Card {
  title: string;
  description: string;
  url: string;
}

@Component({
  selector: 'app-home-for-you',
  standalone: true,
  imports: [Button, Ripple, NgForOf, SwiperDirectiveDirective, NgStyle],
  templateUrl: './home-for-you.component.html',
  styleUrl: './home-for-you.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeForYouComponent {
  swiperConfig: SwiperOptions = {
    spaceBetween: 20,
    slidesPerView: 3,
    height: 100,
    pagination: { clickable: true },
    navigation: true,
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
}
