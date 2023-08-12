import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormsModule,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
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
    MatSnackBarModule,
  ],
})
export class LoginComponent {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  isLoading: boolean = false;
  auth$: Observable<string>;

  constructor(
    private authService: AuthService,
    private store: Store<{ auth: string }>,
    private router: Router,
    private matSnackBar: MatSnackBar
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

          if (res.success) {
            this.authService.setToken(res.value.token);
            this.store.dispatch(login());
            this.router.navigate(['/']);
          } else {
            if (res.errors.length > 0) {
              this.matSnackBar.open(res.errors.join(' '), '', {
                duration: 3000,
              });
            } else {
              this.matSnackBar.open('Error when logging in.', '', {
                duration: 3000,
              });
            }
            console.error(res.errors);
          }
        },
        error: (err) => {
          this.matSnackBar.open(err.message, '', {
            duration: 3000,
          });
          console.error(err);
          this.isLoading = false;
        },
      });
  }
}
