import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Button, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
