import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LogoutComponent],
  imports: [CommonModule, LoginComponent],
})
export class AuthModule {}
