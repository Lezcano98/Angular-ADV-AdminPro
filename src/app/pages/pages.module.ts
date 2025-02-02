import { NgModule } from '@angular/core';
//
import { CommonModule } from '@angular/common';
//
import { ComponetsModule } from '../components/componets.module';
//
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
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
//
import { PerfilComponent } from './perfil/perfil.component';
//
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
//
import {HospitalesComponent} from './mantenimientos/hospitales/hospitales.component';
//
import { MedicosComponent } from './mantenimientos/medicos/medicos.component'
//
import { PipesModule } from '../pipes/pipes.module';
//
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';


@NgModule({
  declarations: [
    PagesComponent,
    Grafica1Component,
    ProgressComponent,
    DashboardComponent,
    AccountSettingComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedasComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ComponetsModule,
    ReactiveFormsModule,
    PipesModule
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
