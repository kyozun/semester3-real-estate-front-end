import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'app-home-for-you',
    standalone: true,
    imports: [Button, Ripple],
    templateUrl: './home-for-you.component.html',
    styleUrl: './home-for-you.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeForYouComponent {}
