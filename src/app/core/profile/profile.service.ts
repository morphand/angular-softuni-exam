import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, RENT_CAR_ENDPOINT } from 'src/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get<Car[]>(`${API_URL}${RENT_CAR_ENDPOINT}`);
  }
}
