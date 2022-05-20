import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ClientIndexComponent } from './client-index/client-index.component';

export const ROUTES_PANEL: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'client', component: ClientIndexComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
