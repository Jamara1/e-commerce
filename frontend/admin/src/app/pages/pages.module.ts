import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    PagesComponent,
    AuthComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
  ]
})
export class PagesModule {}
