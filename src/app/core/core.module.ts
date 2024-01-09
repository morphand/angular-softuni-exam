import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { MatButtonModule } from '@angular/material/button';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

import { CatalogComponent } from './catalog/catalog.component';
import { CatalogDetailsComponent } from './catalog-details/catalog-details.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    imports: [
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    CatalogComponent,
    CatalogDetailsComponent,
    ProfileComponent,
    NavbarComponent, FooterComponent, HomeComponent,
],
    exports: [NavbarComponent, FooterComponent],
})
export class CoreModule {}
