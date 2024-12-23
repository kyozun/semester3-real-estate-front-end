import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { HomeComponent } from './features/property/pages/home/home.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { NotFoundComponent } from './features/property/components/not-found/not-found.component';
import { PropertyDetail } from './features/property/pages/property-detail/property-detail.component';
import { DashboardComponent } from './features/admin/components/dashboard/dashboard.component';
import { UsersComponent } from './features/admin/components/users/users.component';
import { SettingsComponent } from './features/admin/components/settings/settings.component';
import { AnalyticComponent } from './features/admin/components/analytic/analytic.component';
import { AddPropertyComponent } from './features/admin/components/add-property/add-property.component';
import { PropertyListComponent } from './features/property/pages/property-list/property-list.component';
import { AdminPropertyListComponent } from './features/admin/components/admin-property-list/admin-property-list.component';
import { authGuard } from './core/auth/auth.guard';
import { guessGuard } from './core/auth/guess.guard';
import { MyAccountComponent } from './features/my-account/pages/my-account/my-account.component';
import { AllListingsComponent } from './features/my-account/components/all-listings/all-listings.component';
import { AddListingComponent } from './features/my-account/components/add-listing/add-listing.component';
import { EditListingsComponent } from './features/my-account/components/edit-listings/edit-listings.component';
import { ViewListingsComponent } from './features/my-account/components/view-listings/view-listings.component';
import { PropertyTypeListComponent } from './features/admin/components/property-type/property-type-list/property-type-list.component';
import { AddPropertyTypeComponent } from './features/admin/components/property-type/add-property-type/add-property-type.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    title: 'Real Estate',
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivateChild: [authGuard],
    title: 'My Account',
    children: [
      { path: 'settings', component: SettingsComponent },
      {
        path: 'all-listings',
        children: [
          { path: '', component: AllListingsComponent, title: 'All Listings' },
          { path: 'add', component: AddListingComponent, title: 'Add Listing' },
          { path: 'edit', component: EditListingsComponent, title: 'Edit Listing' },
          { path: 'view', component: ViewListingsComponent, title: 'View Listing' },
        ],
      },
      {
        path: '',
        redirectTo: 'all-listings',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent, canActivate: [guessGuard], title: 'Login' },
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
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: AnalyticComponent, title: 'Dashboard' },
      { path: 'user', component: UsersComponent },
      { path: 'setting', component: SettingsComponent },
      {
        path: 'property',
        children: [
          { path: '', component: AdminPropertyListComponent },
          { path: 'add', component: AddPropertyComponent },
        ],
      },

      {
        path: 'property-type',
        children: [
          { path: '', component: PropertyTypeListComponent },
          { path: 'add', component: AddPropertyTypeComponent },
        ],
      },
      { path: 'analytic', component: AnalyticComponent },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
    component: DashboardComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
  },
];
