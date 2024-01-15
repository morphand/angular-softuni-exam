import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import {
  API_URL,
  CATALOG_ENDPOINT,
  CATALOG_SINGLE_CAR_ENDPOINT,
  RENT_CAR_ENDPOINT,
} from 'src/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getCatalog() {
    return this.http.get<CatalogResult>(`${API_URL}${CATALOG_ENDPOINT}`);
  }

  getCarById(carId: string) {
    return this.http.get<SingleCarResult>(
      `${API_URL}${CATALOG_SINGLE_CAR_ENDPOINT}${carId}`,
    );
  }

  rentCar(carId: string) {
    return this.http.post<Result>(`${API_URL}${RENT_CAR_ENDPOINT}`, { carId });
  }
}
