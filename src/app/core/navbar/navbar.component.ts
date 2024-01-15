import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class NavbarComponent implements OnInit {
  private store: Store<{ auth: string }> = inject(Store);

  auth$: Observable<string>;
  isUserLoggedIn: boolean = false;

  constructor() {
    this.auth$ = this.store.select('auth');
  }

  ngOnInit(): void {
    this.auth$.subscribe((data) => {
      this.isUserLoggedIn = data === 'login';
    });
  }
}
