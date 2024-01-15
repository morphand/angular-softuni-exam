import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormsModule,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from 'src/utils/constants';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatSnackBarModule,
  ],
})
export class RegisterComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private matSnackBar: MatSnackBar = inject(MatSnackBar);

  passwordValidators = [
    Validators.required,
    Validators.minLength(PASSWORD_MIN_LENGTH),
    Validators.maxLength(PASSWORD_MAX_LENGTH),
  ];
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(USERNAME_MIN_LENGTH),
    Validators.maxLength(USERNAME_MAX_LENGTH),
  ]);
  password = new FormControl('', this.passwordValidators);
  repeatPassword = new FormControl('', this.passwordValidators);
  email = new FormControl('', [Validators.required, Validators.email]);
  isLoading: boolean = false;

  constructor() {}

  getEmailError() {
    if (this.email.hasError('required')) {
      return 'You must enter a value.';
    }

    return this.email.hasError('email') ? 'Invalid email.' : '';
  }

  getUsernameError() {
    if (this.username.hasError('required')) {
      return 'You must enter a value.';
    }

    if (this.username.hasError('minlength')) {
      return `The username should be at least. ${
        this.username.getError('minlength').requiredLength
      } characters long.`;
    }
    if (this.username.hasError('maxlength')) {
      return `The username should be at most. ${
        this.username.getError('maxlength').requiredLength
      } characters long.`;
    }

    return this.username.hasError('username') ? 'Invalid username.' : '';
  }

  getPasswordError() {
    if (this.password.hasError('required')) {
      return 'You must enter a value.';
    }
    if (this.password.hasError('minlength')) {
      return `The password should be at least. ${
        this.password.getError('minlength').requiredLength
      } characters long.`;
    }
    if (this.password.hasError('maxlength')) {
      return `The password should be at most. ${
        this.password.getError('maxlength').requiredLength
      } characters long.`;
    }

    return this.password.hasError('password') ? 'Invalid password.' : '';
  }

  getRepeatPasswordError() {
    if (this.repeatPassword.hasError('required')) {
      return 'You must enter a value.';
    }
    if (this.repeatPassword.hasError('minlength')) {
      return `The repeat password should be at least. ${
        this.repeatPassword.getError('minlength').requiredLength
      } characters long.`;
    }
    if (this.repeatPassword.hasError('maxlength')) {
      return `The repeat password should be at most. ${
        this.repeatPassword.getError('maxlength').requiredLength
      } characters long.`;
    }

    return this.repeatPassword.hasError('repeatPassword')
      ? 'Invalid repeat password.'
      : '';
  }

  private registerHandler(res: LoginResult) {
    this.isLoading = false;

    if (res.success) {
      this.router.navigate(['/']);
    } else {
      if (res.errors.length > 0) {
        this.matSnackBar.open(res.errors.join(' '), '', {
          duration: 3000,
        });
      } else {
        this.matSnackBar.open('Error when registering.', '', {
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

  register() {
    if (this.password.value !== this.repeatPassword.value) {
      this.password.setErrors({ valid: false });
      this.repeatPassword.setErrors({ valid: false });
      this.matSnackBar.open('Both passwords should match.', '', {
        duration: 3000,
      });
    } else {
      this.isLoading = true;

      this.authService
        .requestRegister(
          this.username.value,
          this.password.value,
          this.repeatPassword.value,
          this.email.value,
        )
        .subscribe({
          next: this.registerHandler.bind(this),
          error: this.errorHandler.bind(this),
        });
    }
  }
}
