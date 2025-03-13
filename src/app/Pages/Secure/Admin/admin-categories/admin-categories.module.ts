import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminCategoriesPageRoutingModule } from './admin-categories-routing.module';

import { AdminCategoriesPage } from './admin-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminCategoriesPageRoutingModule
  ],
  declarations: [AdminCategoriesPage]
})
export class AdminCategoriesPageModule {}
