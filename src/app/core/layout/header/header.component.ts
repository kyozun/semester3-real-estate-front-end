import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { UserResponse } from '../../auth/auth.model';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Button, RouterLink, AsyncPipe, AvatarModule, UpperCasePipe, MenuModule, BadgeModule, Ripple],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  items?: MenuItem[];
  private authService = inject(AuthService);
  currentUser$: Observable<UserResponse | null> = this.authService.currentUser$;
  private router = inject(Router);

  ngOnInit(): void {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => this.router.navigate(['/my-account']),
          },
          {
            label: 'Dashboard',
            icon: 'pi pi-th-large',
            command: () => this.router.navigate(['/admin']),
          },
        ],
      },
      {
        label: 'My Account',
        items: [
          {
            label: 'Balance',
            icon: 'pi pi-money-bill',
          },
          {
            label: 'Settings',
            icon: 'pi pi-cog',
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.authService.logout(),
          },
        ],
      },
    ];
  }
}
