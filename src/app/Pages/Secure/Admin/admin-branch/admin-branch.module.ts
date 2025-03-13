import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminBranchPageRoutingModule } from './admin-branch-routing.module';

import { AdminBranchPage } from './admin-branch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminBranchPageRoutingModule
  ],
  declarations: [AdminBranchPage]
})
export class AdminBranchPageModule {}
