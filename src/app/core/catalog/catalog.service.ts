import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  API_URL,
  CATALOG_ENDPOINT,
  CATALOG_SINGLE_CAR_ENDPOINT,
} from 'src/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  getCatalog() {
    return this.http.get<CatalogResult>(`${API_URL}${CATALOG_ENDPOINT}`);
  }

  getCarById(carId: string) {
    return this.http.get<SingleCarResult>(`${API_URL}${CATALOG_SINGLE_CAR_ENDPOINT}${carId}`);
  }
}
