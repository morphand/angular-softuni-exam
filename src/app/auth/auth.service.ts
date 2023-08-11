import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_URL, LOGIN_ENDPOINT } from 'src/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  requestLogin(username: String | null, password: String | null) {
    return this.http.post<LoginResult>(`${API_URL}${LOGIN_ENDPOINT}`, {
      username: username,
      password: password,
    });
  }

  setToken(token: JSONWebToken) {
    localStorage.setItem('auth', token);
    return this.isTokenAvailable();
  }

  getToken() {
    return localStorage.getItem('auth');
  }

  isTokenAvailable() {
    return Boolean(this.getToken());
  }

  removeToken() {
    localStorage.removeItem('auth');
    return !this.isTokenAvailable();
  }
}
