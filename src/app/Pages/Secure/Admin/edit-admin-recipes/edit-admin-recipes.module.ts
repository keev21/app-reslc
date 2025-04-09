import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAdminRecipesPageRoutingModule } from './edit-admin-recipes-routing.module';

import { EditAdminRecipesPage } from './edit-admin-recipes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAdminRecipesPageRoutingModule
  ],
  declarations: [EditAdminRecipesPage]
})
export class EditAdminRecipesPageModule {}
