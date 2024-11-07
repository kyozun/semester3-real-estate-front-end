import { Component } from '@angular/core';
import { Button } from 'primeng/button'
import { Ripple } from 'primeng/ripple'

@Component({
    selector: 'app-home-location',
    standalone: true,
    imports: [Button, Ripple],
    templateUrl: './home-location.component.html',
    styleUrl: './home-location.component.css',
})
export class HomeLocationComponent {}
