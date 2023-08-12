import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

function isUserLoggedIn() {
  const authService = inject(AuthService);
  const isUserLoggedIn = authService.isTokenAvailable();

  return isUserLoggedIn;
}

export const requiresLoggedOutGuard: CanActivateFn = (_route, _state) => {
  return !isUserLoggedIn() || inject(Router).createUrlTree(['/']);
};

export const requiresLoggedInGuard: CanActivateFn = (_route, _state) => {
  return isUserLoggedIn() || inject(Router).createUrlTree(['/']);
};
