import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormsModule,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
export class LoginComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private store: Store<{ auth: string }> = inject(Store);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private matSnackBar: MatSnackBar = inject(MatSnackBar);

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  isLoading: boolean = false;
  auth$: Observable<string>;
  redirectedFromCarId: Car['_id'] | null = null;

  constructor() {
    this.auth$ = this.store.select('auth');
  }

  ngOnInit(): void {
    this.redirectedFromCarId =
      this.route.snapshot.params['redirectedFromCarId'];
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

  private loginHandler(res: LoginResult) {
    this.isLoading = false;

    if (res.success) {
      this.authService.setToken(res.value.token);
      this.authService.setUsername(res.value.username);
      this.store.dispatch(login());
      if (this.redirectedFromCarId) {
        this.router.navigate(['catalog', this.redirectedFromCarId]);
      } else {
        this.router.navigate(['/']);
      }
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
  }

  private errorHandler(err: Error) {
    this.matSnackBar.open(err.message, '', {
      duration: 3000,
    });
    console.error(err);
    this.isLoading = false;
  }

  login() {
    this.isLoading = true;
    return this.authService
      .requestLogin(this.username.value, this.password.value)
      .subscribe({
        next: this.loginHandler.bind(this),
        error: this.errorHandler.bind(this),
      });
  }
}
