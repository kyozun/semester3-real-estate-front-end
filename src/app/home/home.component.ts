import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { HomeSearchComponent } from '../home-search/home-search.component';
import { HomeAgentComponent } from '../home-agent/home-agent.component';
import { HomeForYouComponent } from '../home-for-you/home-for-you.component';
import { HomeMostViewedComponent } from '../home-most-viewed/home-most-viewed.component';
import { HomeNewsComponent } from '../home-news/home-news.component';
import { HomeLocationComponent } from '../home-location/home-location.component';
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { SwiperOptions } from 'swiper/types';
import { SwiperDirectiveDirective } from '../directives/swiper-directive.directive';
import { NgForOf, NgStyle } from '@angular/common';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavComponent,
    HomeSearchComponent,
    HomeAgentComponent,
    HomeForYouComponent,
    HomeMostViewedComponent,
    HomeNewsComponent,
    HomeLocationComponent,
    LoginComponent,
    FooterComponent,
    FormsModule,
    SliderModule,
    SwiperDirectiveDirective,
    NgStyle,
    NgForOf,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
