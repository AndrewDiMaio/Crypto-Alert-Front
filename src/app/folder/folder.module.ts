import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import {TradingviewComponent} from '../tradingview/tradingview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
  ],
  exports: [
    TradingviewComponent
  ],
  declarations: [FolderPage, TradingviewComponent]
})
export class FolderPageModule {}
