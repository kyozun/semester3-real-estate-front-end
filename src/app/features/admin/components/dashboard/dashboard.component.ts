import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BadgeModule } from 'primeng/badge'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RippleModule, AvatarModule, StyleClassModule, RouterOutlet, NgClass, MenuModule, ToastModule, BadgeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  sidebarVisible: boolean = true;
  items?: MenuItem[];

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  ngOnInit() {
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
