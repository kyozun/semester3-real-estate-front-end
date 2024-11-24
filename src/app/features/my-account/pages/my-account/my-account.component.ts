import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { Button } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { HeaderComponent } from '../../../../core/layout/header/header.component'
import { FooterComponent } from '../../../../core/layout/footer/footer.component'
import { HomeAgentComponent } from '../../../property/components/home-agent/home-agent.component'
import { HomeForYouComponent } from '../../../property/components/home-for-you/home-for-you.component'
import { HomeMostViewedComponent } from '../../../property/components/home-most-viewed/home-most-viewed.component'
import { HomeNewsComponent } from '../../../property/components/home-news/home-news.component'
import { HomeSearchComponent } from '../../../property/components/home-search/home-search.component'
import { ScrollTopModule } from 'primeng/scrolltop'
import { AsyncPipe, CurrencyPipe, UpperCasePipe } from '@angular/common'
import { AuthService } from '../../../../core/auth/auth.service'
import { Observable } from 'rxjs'
import { UserResponse } from '../../../../core/auth/auth.model'

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    AvatarModule,
    BadgeModule,
    Button,
    MenuModule,
    Ripple,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HomeAgentComponent,
    HomeForYouComponent,
    HomeMostViewedComponent,
    HomeNewsComponent,
    HomeSearchComponent,
    ScrollTopModule,
    UpperCasePipe,
    AsyncPipe,
    CurrencyPipe,
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAccountComponent implements OnInit {
  items?: MenuItem[];
  private authService = inject(AuthService);
  currentUser$: Observable<UserResponse | null> = this.authService.currentUser$;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-home',
          },
          {
            label: 'Upload',
            icon: 'pi pi-upload',
          },
        ],
      },
      {
        label: 'My Account',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
          },
        ],
      },
    ];
  }
}
