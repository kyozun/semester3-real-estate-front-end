import { Component } from '@angular/core'
import { TabViewModule } from 'primeng/tabview'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import {HomeMostViewedComponent} from '../home-most-viewed/home-most-viewed.component';
import {HomeForYouComponent} from '../home-for-you/home-for-you.component';
import {HomeAgentComponent} from '../home-agent/home-agent.component';
@Component({
    selector: 'app-home-search',
    standalone: true,
    imports: [TabViewModule, InputTextModule, ButtonModule, HomeMostViewedComponent, HomeForYouComponent, HomeAgentComponent],
    templateUrl: './home-search.component.html',
    styleUrl: './home-search.component.css',
})
export class HomeSearchComponent {}
