import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { CatalogService } from '../catalog/catalog.service';
import { API_URL } from 'src/utils/constants';

const enterTransition = transition(':enter', [
  style({
    opacity: 0,
    transform: 'translateY(3rem)',
  }),
  animate('350ms ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
]);

const fadeIn = trigger('fadeIn', [enterTransition]);

@Component({
  selector: 'app-catalog-details',
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  animations: [fadeIn],
})
export class CatalogDetailsComponent implements OnInit {
  private catalogService: CatalogService = inject(CatalogService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private store: Store<{ auth: string }> = inject(Store);

  auth$: Observable<string>;
  isUserLoggedIn: boolean = false;
  car: Car | null = null;
  API_URL = API_URL;
  carId: string = '';
  secondaryButtonsVisible: boolean = false;

  constructor() {
    this.auth$ = this.store.select('auth');
  }

  showSecondaryButtons() {
    this.secondaryButtonsVisible = true;
  }

  hideSecondaryButtons() {
    this.secondaryButtonsVisible = false;
  }

  rentCar() {
    this.catalogService.rentCar(this.carId).subscribe({
      next: (res) => {
        if (!res.success) {
          console.error(res.errors.join(' '));
        } else {
          this.router.navigate(['/profile']);
        }
      },
    });
  }

  ngOnInit(): void {
    this.carId = this.route.snapshot.params['id'];
    this.catalogService.getCarById(this.carId).subscribe({
      next: (res) => {
        if (!res.success) {
          this.router.navigate(['/catalog']);
        } else {
          this.car = res.value.car;
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
    this.auth$.subscribe((data) => {
      this.isUserLoggedIn = data === 'login';
    });
  }
}
