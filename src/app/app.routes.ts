import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RealEstateListComponent } from './real-estate-list/real-estate-list.component';
import { RealEstateDetailComponent } from './real-estate-detail/real-estate-detail.component';

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
        path: 'search',
        component: RealEstateListComponent,
    },
  {
    path: 'real-estate/details/:id',
    component: RealEstateDetailComponent,
  },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Not Found',
    },
];
