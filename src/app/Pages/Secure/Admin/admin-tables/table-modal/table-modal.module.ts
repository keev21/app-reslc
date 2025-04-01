import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TableModalPageRoutingModule } from './table-modal-routing.module';

import { TableModalPage } from './table-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TableModalPageRoutingModule
  ],
  declarations: [TableModalPage]
})
export class TableModalPageModule {}
