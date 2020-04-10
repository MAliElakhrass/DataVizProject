import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
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
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BarchartComponent,
    HeatmapComponent,
    ScatterplotComponent,
    BubblechartComponent
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
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BarchartComponent,
    HeatmapComponent,
    ScatterplotComponent,
    BubblechartComponent
  ]
})
export class SharedModule { }
