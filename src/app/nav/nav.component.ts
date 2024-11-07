import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-nav',
    standalone: true,
    imports: [Button, RouterLink],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css',
})
export class NavComponent {}
