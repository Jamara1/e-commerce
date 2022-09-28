import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './guards/admin.guard';

import { ROUTES_PANEL } from './pages/pages-routing.module';

import { AuthComponent } from './pages/auth/auth.component';
import { PagesComponent } from './pages/pages.component';

const ROUTES: Routes = [
  { path: 'login', component: AuthComponent },
  {
    path: 'panel',
    component: PagesComponent,
    children: ROUTES_PANEL,
    canActivate: [AdminGuard],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
