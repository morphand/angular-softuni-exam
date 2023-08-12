import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_URL, CATALOG_ENDPOINT } from 'src/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  getCatalog() {
    return this.http.get<CatalogResult>(`${API_URL}${CATALOG_ENDPOINT}`);
  }
}
