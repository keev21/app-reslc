import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAdminBranchPageRoutingModule } from './edit-admin-branch-routing.module';

import { EditAdminBranchPage } from './edit-admin-branch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAdminBranchPageRoutingModule
  ],
  declarations: [EditAdminBranchPage]
})
export class EditAdminBranchPageModule {}
