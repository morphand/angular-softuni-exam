import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { MatButtonModule } from '@angular/material/button';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [CommonModule, AppRoutingModule, MatButtonModule, SharedModule],
  exports: [NavbarComponent, FooterComponent],
})
export class CoreModule {}
