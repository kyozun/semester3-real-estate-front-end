import { Component } from '@angular/core'
import { Button, ButtonDirective } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { InputTextModule } from 'primeng/inputtext'
import { Ripple } from 'primeng/ripple'
import { RouterLink } from '@angular/router'
import { InputGroupModule } from 'primeng/inputgroup'
import { InputGroupAddonModule } from 'primeng/inputgroupaddon'

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ButtonDirective, CheckboxModule, InputTextModule, Ripple, RouterLink, InputGroupModule, InputGroupAddonModule, Button],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {}
