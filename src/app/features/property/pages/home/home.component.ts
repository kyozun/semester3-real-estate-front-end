import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../../../core/layout/header/header.component';
import { HomeSearchComponent } from '../../components/home-search/home-search.component';
import { HomeAgentComponent } from '../../components/home-agent/home-agent.component';
import { HomeForYouComponent } from '../../components/home-for-you/home-for-you.component';
import { HomeMostViewedComponent } from '../../components/home-most-viewed/home-most-viewed.component';
import { HomeNewsComponent } from '../../components/home-news/home-news.component';
import { LoginComponent } from '../../../../core/auth/pages/login/login.component';
import { FooterComponent } from '../../../../core/layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { SwiperDirectiveDirective } from '../../../../shared/directives/swiper-directive.directive';
import { NgForOf, NgStyle } from '@angular/common';
import { ScrollTopModule } from 'primeng/scrolltop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, HomeSearchComponent, HomeAgentComponent, HomeForYouComponent, HomeMostViewedComponent, HomeNewsComponent, LoginComponent, FooterComponent, FormsModule, SliderModule, SwiperDirectiveDirective, NgStyle, NgForOf, ScrollTopModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
