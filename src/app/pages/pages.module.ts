import { NgModule } from '@angular/core';
//
import { CommonModule } from '@angular/common';
//
import { ComponetsModule } from '../components/componets.module';
//
import { FormsModule} from '@angular/forms'
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
//
import { AccountSettingComponent } from './account-setting/account-setting.component';
//
import { PromesasComponent } from './promesas/promesas.component';
//
import { RxjsComponent } from './rxjs/rxjs.component';





@NgModule({
  declarations: [
    PagesComponent,
    Grafica1Component,
    ProgressComponent,
    DashboardComponent,
    AccountSettingComponent,
    PromesasComponent,
    RxjsComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponetsModule
  ],

exports:[
  PagesComponent,
  Grafica1Component,
  ProgressComponent,
  DashboardComponent,
  AccountSettingComponent

]

})

export class PagesModule { }
