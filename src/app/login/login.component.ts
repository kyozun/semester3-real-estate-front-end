import { Component } from '@angular/core'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { Ripple } from 'primeng/ripple'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [InputTextModule, ButtonModule, CheckboxModule, Ripple, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent {}
