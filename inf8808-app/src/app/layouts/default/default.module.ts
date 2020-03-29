import { HttpClientModule } from '@angular/common/http';
import { ParamWeightDataService } from './../../services/param-weight-data.service';
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
import { MatTabsModule } from '@angular/material/tabs';

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
    MatDividerModule,
    MatTabsModule,
    HttpClientModule
  ],
  providers: [
    ParamWeightDataService
  ]
})
export class DefaultModule { }
