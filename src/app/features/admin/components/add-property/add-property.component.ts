import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TagModule } from 'primeng/tag'
import { InputTextModule } from 'primeng/inputtext'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [TagModule, InputTextModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPropertyComponent {}
