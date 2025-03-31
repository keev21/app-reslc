import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAdminFloorsPageRoutingModule } from './edit-admin-floors-routing.module';

import { EditAdminFloorsPage } from './edit-admin-floors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAdminFloorsPageRoutingModule
  ],
  declarations: [EditAdminFloorsPage]
})
export class EditAdminFloorsPageModule {}
