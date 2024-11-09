import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-home-agent',
    standalone: true,
    imports: [ButtonModule],
    templateUrl: './home-agent.component.html',
    styleUrl: './home-agent.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeAgentComponent {}