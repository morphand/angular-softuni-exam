import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { ProfileService } from './profile.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterLink, MatButtonModule],
})
export class ProfileComponent implements OnInit {
  private profileService: ProfileService = inject(ProfileService);
  private authService: AuthService = inject(AuthService);

  username: string | null = '';
  rentedCars: Car[] = [];
  displayedColumns: string[] = [
    'model',
    'madeIn',
    'fuel',
    'sizeInL',
    'powerOutputInHp',
    'link',
  ];

  constructor() {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        this.rentedCars = res;
      },
      error: (err) => console.error(err),
    });
    this.username = this.authService.getUsername();
  }
}
