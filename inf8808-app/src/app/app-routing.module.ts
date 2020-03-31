import { ParamweightComponent } from './modules/paramweight/paramweight.component';
import { MainpageComponent } from './modules/mainpage/mainpage.component';
import { BubblechartComponent } from './modules/bubblechart/bubblechart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { CorrelationComponent } from './modules/correlation/correlation.component';


const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children:[{
    path: '',
    component: MainpageComponent
  },
  {
    path: 'bubblechart',
    component: BubblechartComponent   
  },
  {
    path: 'paramweight',
    component: ParamweightComponent
  },
  {
    path: 'correlation',
    component: CorrelationComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
