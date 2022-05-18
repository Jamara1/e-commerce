import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [NavBarComponent, FooterComponent],
  imports: [CommonModule],
  exports: [NavBarComponent, FooterComponent],
})
export class ComponentsModule {}
