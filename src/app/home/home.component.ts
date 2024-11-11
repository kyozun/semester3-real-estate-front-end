import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { HomeSearchComponent } from '../home-search/home-search.component';
import { HomeAgentComponent } from '../home-agent/home-agent.component';
import { HomeForYouComponent } from '../home-for-you/home-for-you.component';
import { HomeMostViewedComponent } from '../home-most-viewed/home-most-viewed.component';
import { HomeNewsComponent } from '../home-news/home-news.component';
import { HomeLocationComponent } from '../home-location/home-location.component';
import { LoginComponent } from '../login/login.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
