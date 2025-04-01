import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoleModalPageRoutingModule } from './role-modal-routing.module';

import { RoleModalPage } from './role-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoleModalPageRoutingModule
  ],
  declarations: [RoleModalPage]
})
export class RoleModalPageModule {}
