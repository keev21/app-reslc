import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminFloorsPageRoutingModule } from './admin-floors-routing.module';

import { AdminFloorsPage } from './admin-floors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminFloorsPageRoutingModule
  ],
  declarations: [AdminFloorsPage]
})
export class AdminFloorsPageModule {}
