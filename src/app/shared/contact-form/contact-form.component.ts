import { Component, inject } from '@angular/core';

import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class ContactFormComponent {
  private matSnackBar: MatSnackBar = inject(MatSnackBar);

  email = new FormControl('', [Validators.required, Validators.email]);
  message = new FormControl('', [Validators.required]);

  constructor() {}

  getEmailError() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getMessageError() {
    if (this.email.hasError('required')) {
      return 'You must enter a message';
    }

    return '';
  }

  sendMessage() {
    if (!this.email.errors && !this.message.errors) {
      this.matSnackBar.open('Message sent successfully.', '', {
        duration: 3000,
      });
    }
  }
}
