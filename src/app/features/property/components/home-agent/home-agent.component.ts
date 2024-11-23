import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip'
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-home-agent',
  standalone: true,
  imports: [ButtonModule, AvatarModule, RatingModule, TooltipModule, BadgeModule],
  templateUrl: './home-agent.component.html',
  styleUrl: './home-agent.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeAgentComponent {}
