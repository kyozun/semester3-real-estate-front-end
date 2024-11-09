import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'app-home-most-viewed',
    standalone: true,
    imports: [ButtonModule, Ripple],
    templateUrl: './home-most-viewed.component.html',
    styleUrl: './home-most-viewed.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeMostViewedComponent {}
