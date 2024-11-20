import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../auth/auth.model';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Button, RouterLink, AsyncPipe, AvatarModule, UpperCasePipe, MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  items?: MenuItem[];
  private authService = inject(AuthService);
  currentUser$: Observable<User | null> = this.authService.currentUser$;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Balance',
            icon: 'pi pi-money-bill\n',
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
            disabled: true,
          },
        ],
      },
    ];
  }
}
