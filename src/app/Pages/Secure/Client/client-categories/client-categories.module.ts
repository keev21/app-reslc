import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientCategoriesPageRoutingModule } from './client-categories-routing.module';

import { ClientCategoriesPage } from './client-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientCategoriesPageRoutingModule
  ],
  declarations: [ClientCategoriesPage]
})
export class ClientCategoriesPageModule {}
