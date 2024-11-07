import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-home-news',
  standalone: true,
  imports: [AvatarModule, AvatarGroupModule],
  templateUrl: './home-news.component.html',
  styleUrl: './home-news.component.css'
})
export class HomeNewsComponent {

}
