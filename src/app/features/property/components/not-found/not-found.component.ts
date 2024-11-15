import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [RouterLink, Button],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
