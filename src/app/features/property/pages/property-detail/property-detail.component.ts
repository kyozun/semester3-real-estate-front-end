import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../../../../core/layout/header/header.component';
import { FooterComponent } from '../../../../core/layout/footer/footer.component';
import { LightgalleryModule } from 'lightgallery/angular/16';
import lgZoom from 'lightgallery/plugins/zoom';
import lgRotate from 'lightgallery/plugins/rotate';
import lgFullScreen from 'lightgallery/plugins/fullscreen';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgAutoPlay from 'lightgallery/plugins/autoplay';
import { YouTubePlayer } from '@angular/youtube-player';
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
import { Property } from '../../models/property';
import { environment } from '../../../../../environments/environment.development';
import { LightGallerySettings } from 'lightgallery/lg-settings';
import { GoogleMap, MapMarker } from '@angular/google-maps'

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, LightgalleryModule, YouTubePlayer, NgStyle, NgClass, YtPlayerComponent, AvatarModule, BadgeModule, Button, TooltipModule, Ripple, BreadcrumbModule, NgIf, AsyncPipe, ProgressBarModule, GoogleMap, MapMarker],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyDetail implements OnInit {
  settings: LightGallerySettings = {
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
  };
  protected readonly environment = environment;
  private route = inject(ActivatedRoute);
  /*Services*/
  private propertyService = inject(PropertyService);
  /*Observable*/
  property$: Observable<Property> = this.propertyService.getProperty$();
  isLoading$: Observable<boolean> = this.propertyService.getLoading$();

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe({
      next: (params: Params) => {
        this.propertyService.getProperty(params['propertyId']);
      },
    });
    this.searchLocationByName('hanoi')

  }

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng!.toJSON());
  }
  searchLocationByName(locationName: string): void {
    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    const request: google.maps.places.TextSearchRequest = {
      query: locationName,
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const location = results[0].geometry?.location;
        if (location) {
          // Update map center
          this.center = {
            lat: location.lat(),
            lng: location.lng(),
          };
          this.zoom = 12;

          // Add marker to the location
          this.markerPositions = [
            {
              lat: location.lat(),
              lng: location.lng(),
            },
          ];
        }
      } else {
        console.error('Error fetching location:', status);
      }
    });
  }


}
