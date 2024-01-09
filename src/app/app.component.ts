import { Component } from '@angular/core';
import { FooterComponent } from './core/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        NavbarComponent,
        RouterOutlet,
        FooterComponent,
    ],
})
export class AppComponent {
  title = 'angular-softuni-exam';
}
