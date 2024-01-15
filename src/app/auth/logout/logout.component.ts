import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { logout } from '../auth.actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  standalone: true,
})
export class LogoutComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private store: Store<{ auth: string }> = inject(Store);

  auth$: Observable<string>;
  constructor() {
    this.auth$ = this.store.select('auth');
  }

  ngOnInit(): void {
    const isTokenAvailable = this.authService.isTokenAvailable();
    if (isTokenAvailable) {
      this.authService.removeToken();
      this.authService.removeUsername();
      this.store.dispatch(logout());
    }
    this.router.navigate(['/']);
  }
}
