import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';
import { LightgalleryModule } from 'lightgallery/angular/16';
import lgZoom from 'lightgallery/plugins/zoom';
import lgRotate from 'lightgallery/plugins/rotate';
import lgFullScreen from 'lightgallery/plugins/fullscreen';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgAutoPlay from 'lightgallery/plugins/autoplay';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { LightGallerySettings } from 'lightgallery/lg-settings';

@Component({
  selector: 'app-real-estate-detail',
  standalone: true,
  imports: [NavComponent, FooterComponent, LightgalleryModule],
  templateUrl: './real-estate-detail.component.html',
  styleUrl: './real-estate-detail.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RealEstateDetailComponent {
  settings: LightGallerySettings = {
    counter: true,
    closable: true,
    rotate: true,
    fullScreen: true,
    download: false,
    thumbnail: true,
    autoplay: true,
    autoplayControls: false,
    slideShowAutoplay : true,

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
  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };
}
