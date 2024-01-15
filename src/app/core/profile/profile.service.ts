import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL, RENT_CAR_ENDPOINT } from 'src/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getProfile() {
    return this.http.get<Car[]>(`${API_URL}${RENT_CAR_ENDPOINT}`);
  }
}
