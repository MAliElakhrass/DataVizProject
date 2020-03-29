import { HeatmapComponent } from './../../modules/heatmap/heatmap.component';
import { ParamweightComponent } from './../../modules/paramweight/paramweight.component';
import { MainpageComponent } from './../../modules/mainpage/mainpage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    DefaultComponent,
    MainpageComponent,
    ParamweightComponent,
    HeatmapComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule
  ]
})
export class DefaultModule { }
