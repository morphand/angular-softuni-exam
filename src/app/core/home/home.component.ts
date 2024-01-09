import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ContactFormComponent } from '../../shared/contact-form/contact-form.component';
import { MatButtonModule } from '@angular/material/button';

const slideUp = trigger('slideUp', [
  transition(':enter', [
    style({
      transform: 'translateY(3rem)',
    }),
    animate('500ms ease-in', style({ transform: 'translateY(0)' })),
  ]),
]);
const slideLeft = trigger('slideLeft', [
  transition(':enter', [
    style({
      transform: 'translateX(3rem)',
    }),
    animate('300ms ease-in', style({ transform: 'translateX(0)' })),
  ]),
]);
const slideDown = trigger('slideDown', [
  transition(':enter', [
    style({
      transform: 'translateY(-9rem)',
    }),
    animate('350ms ease-in', style({ transform: 'translateZ(0)' })),
  ]),
]);

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [slideUp, slideLeft, slideDown],
    standalone: true,
    imports: [MatButtonModule, ContactFormComponent],
})
export class HomeComponent {}
