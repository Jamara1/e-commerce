import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app.routing';

import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [SidebarComponent]
})
export class ComponentsModule { }
