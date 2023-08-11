import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { logout } from '../auth.actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  auth$: Observable<string>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{ auth: string }>
  ) {
    this.auth$ = this.store.select('auth');
  }

  ngOnInit(): void {
    const isTokenAvailable = this.authService.isTokenAvailable();
    if (isTokenAvailable) {
      this.authService.removeToken();
      this.store.dispatch(logout());
    }
    this.router.navigate(['/']);
  }
}
