import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  auth$: Observable<string>;
  isUserLoggedIn: boolean = false;
  constructor(private store: Store<{ auth: string }>) {
    this.auth$ = this.store.select('auth');
  }

  ngOnInit(): void {
    this.auth$.subscribe((data) => {
      this.isUserLoggedIn = data === 'login';
    });
  }
}
