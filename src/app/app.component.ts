import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PrimeNGConfig } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { HeaderComponent } from './core/layout/header/header.component';
import { HomeSearchComponent } from './features/property/components/home-search/home-search.component';
import { HomeComponent } from './features/property/pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, RippleModule, HeaderComponent, HomeSearchComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
