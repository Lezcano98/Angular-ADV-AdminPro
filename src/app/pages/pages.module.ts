import { NgModule } from '@angular/core';
//
import { CommonModule } from '@angular/common';
// importo el sahred puesto que varios componentes de mi sahred los esta usando mi pages 
import { SharedModule } from '../shared/shared.module';
// debo importar mi routingModule puesto que mi pages.components.html esta mi routeroulet
import { AppRoutingModule } from '../app-routing.module';
//
import { PagesComponent } from './pages.component';
//
import { Grafica1Component } from './grafica1/grafica1.component';
//
import { ProgressComponent } from './progress/progress.component';
//
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    PagesComponent,
    Grafica1Component,
    ProgressComponent,
    DashboardComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],

exports:[
  PagesComponent,
  Grafica1Component,
  ProgressComponent,
  DashboardComponent

]

})

export class PagesModule { }
