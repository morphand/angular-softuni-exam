import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { CatalogComponent } from './core/catalog/catalog.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';

import {
  requiresLoggedInGuard,
  requiresLoggedOutGuard,
} from './auth/auth.guard';
import { CatalogDetailsComponent } from './core/catalog-details/catalog-details.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './core/profile/profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  { path: 'catalog/:id', component: CatalogDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [requiresLoggedOutGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [requiresLoggedOutGuard],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [requiresLoggedInGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
