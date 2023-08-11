import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';

export const initialState = 'logout';

export const authReducer = createReducer(
  initialState,
  on(login, (state) => (state = 'login')),
  on(logout, (state) => (state = 'logout'))
);
