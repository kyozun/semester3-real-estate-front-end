import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { HomeComponent } from './features/property/pages/home/home.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { NotFoundComponent } from './features/property/components/not-found/not-found.component';
import { PropertyListComponent } from './features/property/pages/property-list/property-list.component';
import { PropertyDetail } from './features/property/pages/property-detail/property-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    title: 'Real Estate',
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
    ],
  },
  {
    path: 'property/search',
    component: PropertyListComponent,
  },
  {
    path: 'property',
    component: PropertyDetail,
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
  },
];
