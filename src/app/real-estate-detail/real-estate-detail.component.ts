import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { LightgalleryModule } from 'lightgallery/angular/16';
import lgZoom from 'lightgallery/plugins/zoom';
import lgRotate from 'lightgallery/plugins/rotate';
import lgFullScreen from 'lightgallery/plugins/fullscreen';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgAutoPlay from 'lightgallery/plugins/autoplay';
import { YouTubePlayer } from '@angular/youtube-player';
import lightGallery from 'lightgallery';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { YtPlayerComponent } from '../components/yt-player/yt-player.component';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Ripple } from 'primeng/ripple';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-real-estate-detail',
  standalone: true,
  imports: [NavComponent, FooterComponent, LightgalleryModule, YouTubePlayer, NgStyle, NgClass, YtPlayerComponent, AvatarModule, BadgeModule, Button, TooltipModule, Ripple, BreadcrumbModule, NgIf],
  templateUrl: './real-estate-detail.component.html',
  styleUrl: './real-estate-detail.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RealEstateDetailComponent implements AfterViewInit {
  @ViewChild('galleryContainer') galleryContainer!: ElementRef;

  ngAfterViewInit() {
    lightGallery(this.galleryContainer.nativeElement, {
      selector: '.item',
      counter: true,
      closable: true,
      rotate: true,
      fullScreen: true,
      download: false,
      thumbnail: true,
      autoplay: true,
      autoplayControls: false,
      slideShowAutoplay: true,

      thumbMargin: 6,
      plugins: [lgZoom, lgRotate, lgFullScreen, lgThumbnail, lgAutoPlay],
      slideDelay: 0,
      animateThumb: true,
      loop: true,
      startAnimationDuration: 300,
      mode: 'lg-fade',
      speed: 200,
      closeOnTap: true,
    });
  }
}
