import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

export const ROUTES_PANEL: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
