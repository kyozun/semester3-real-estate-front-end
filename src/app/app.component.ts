import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {PrimeNGConfig} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';
import {NavComponent} from './nav/nav.component';
import { HomeSearchComponent } from './home-search/home-search.component'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ButtonModule, RippleModule, NavComponent, HomeSearchComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true
    }
}
