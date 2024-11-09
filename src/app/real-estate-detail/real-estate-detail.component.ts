import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-real-estate-detail',
    standalone: true,
    imports: [NavComponent, FooterComponent],
    templateUrl: './real-estate-detail.component.html',
    styleUrl: './real-estate-detail.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RealEstateDetailComponent {}
