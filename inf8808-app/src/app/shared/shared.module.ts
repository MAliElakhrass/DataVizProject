import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { BarchartComponent } from './components/barchart/barchart.component';
import { HeatmapComponent } from './components/heatmap/heatmap.component';
import { ScatterplotComponent } from './components/scatterplot/scatterplot.component';
import { BubblechartComponent } from './components/bubblechart/bubblechart.component';

@NgModule({
  declarations: [
    BarchartComponent,
    BubblechartComponent,
    HeatmapComponent,
    ScatterplotComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    MatSelectModule,
    MatCardModule
  ],
  exports: [
    BarchartComponent,
    BubblechartComponent,
    HeatmapComponent,
    ScatterplotComponent
  ]
})
export class SharedModule { }
