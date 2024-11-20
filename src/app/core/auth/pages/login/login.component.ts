import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Ripple } from 'primeng/ripple';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, ButtonModule, CheckboxModule, Ripple, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  get username(): string {
    return this.loginForm.get('username')?.value;
  }

  get password(): string {
    return this.loginForm.get('password')?.value;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitLoginForm() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value);
  }
}
