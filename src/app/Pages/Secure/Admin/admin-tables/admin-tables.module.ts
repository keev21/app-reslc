import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminTablesPageRoutingModule } from './admin-tables-routing.module';

import { AdminTablesPage } from './admin-tables.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminTablesPageRoutingModule
  ],
  declarations: [AdminTablesPage]
})
export class AdminTablesPageModule {}
