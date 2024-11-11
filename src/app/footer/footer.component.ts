import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [DropdownModule, FormsModule, InputGroupModule, InputTextModule, ButtonDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  cities: City[] | undefined;

  selectedCity: City | undefined;
  value: string | undefined;

  ngOnInit() {
    this.cities = [
      { name: 'English', code: 'En' },
      { name: 'Tiếng Việt', code: 'Vi' },
    ];
  }
}
