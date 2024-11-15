import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../../../../core/layout/header/header.component';
import { FooterComponent } from '../../../../core/layout/footer/footer.component';
import { LightgalleryModule } from 'lightgallery/angular/16';
import lgZoom from 'lightgallery/plugins/zoom';
import lgRotate from 'lightgallery/plugins/rotate';
import lgFullScreen from 'lightgallery/plugins/fullscreen';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgAutoPlay from 'lightgallery/plugins/autoplay';
import { YouTubePlayer } from '@angular/youtube-player';
import lightGallery from 'lightgallery';
import { AsyncPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { YtPlayerComponent } from '../../../../shared/components/yt-player/yt-player.component';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Ripple } from 'primeng/ripple';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { PropertyService } from '../../services/property.service';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, LightgalleryModule, YouTubePlayer, NgStyle, NgClass, YtPlayerComponent, AvatarModule, BadgeModule, Button, TooltipModule, Ripple, BreadcrumbModule, NgIf, AsyncPipe, ProgressBarModule],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PropertyDetail implements OnInit, AfterViewInit {
  @ViewChild('galleryContainer') galleryContainer!: ElementRef;
  private route = inject(ActivatedRoute);

  /*Services*/
  private realEstateService = inject(PropertyService);

  /*Observable*/
  realEstate$: Observable<any> = this.realEstateService.realEstate$;
  isLoading$: Observable<boolean> = this.realEstateService.isLoading$;

  private propertyId: string;

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

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params: Params) => {
        this.propertyId = params['id'];
        console.log(this.propertyId);
        this.realEstateService.getRealEstate('1');
      },
    });
  }
}
