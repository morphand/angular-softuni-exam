import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormsModule,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';

import { login } from '../auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    NgIf,
  ],
})
export class LoginComponent {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  isLoading: boolean = false;
  auth$: Observable<string>;

  constructor(
    private authService: AuthService,
    private store: Store<{ auth: string }>
  ) {
    this.auth$ = this.store.select('auth');
  }

  getUsernameError() {
    if (this.username.hasError('required')) {
      return 'You must enter a value.';
    }

    return this.username.hasError('username') ? 'Invalid username.' : '';
  }

  getPasswordError() {
    if (this.password.hasError('required')) {
      return 'You must enter a value.';
    }

    return this.password.hasError('password') ? 'Invalid password.' : '';
  }

  login() {
    this.isLoading = true;
    return this.authService
      .requestLogin(this.username.value, this.password.value)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          console.log(res);

          if (res.success) {
            this.store.dispatch(login());
          } else {
            // TODO: Error handler.
            console.error(res.errors);
          }
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        },
      });
  }
}
