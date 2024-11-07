import { Component } from '@angular/core'
import { TabViewModule } from 'primeng/tabview'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
@Component({
    selector: 'app-home-search',
    standalone: true,
    imports: [TabViewModule, InputTextModule, ButtonModule, CardModule],
    templateUrl: './home-search.component.html',
    styleUrl: './home-search.component.css',
})
export class HomeSearchComponent {}
