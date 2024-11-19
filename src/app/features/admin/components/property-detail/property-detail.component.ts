import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyDetailComponent {

}
