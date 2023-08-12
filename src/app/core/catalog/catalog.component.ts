import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { CatalogService } from './catalog.service';
import { API_URL } from 'src/utils/constants';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  standalone: true,
  imports: [RouterModule, MatCardModule, CommonModule, MatButtonModule],
})
export class CatalogComponent implements OnInit {
  cars: Car[] = [];
  API_URL = API_URL;
  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.catalogService.getCatalog().subscribe({
      next: (data) => (this.cars = data.value.cars),
    });
  }
}
