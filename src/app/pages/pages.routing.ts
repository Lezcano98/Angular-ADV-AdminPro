// todo esto es mi sistema de rutas secundario, el cual exportare a mi sistema de rutas principal

import { Routes, RouterModule } from '@angular/router';
//
import {NgModule} from '@angular/core';
//
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
//
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
//matenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';



 const routes: Routes = [
   // definicion de las rutas hijas 
   { 
    path:'dashboard', 
    component:PagesComponent,
    canActivate:[AuthGuard],
    children:[
       //rutas protegidas solo las personas autenticadas tienen acceso a estas rutas
        { path:'', component:DashboardComponent, data: {titulo:'DashBoard'} },
 
        { path:'grafica1', component:Grafica1Component, data: {titulo:'Grafica'} },
 
        { path:'progress', component:ProgressComponent,data: {titulo:'Progress Bar'} },

        { path:'account-settings',component:AccountSettingComponent, data: {titulo:'Account-Settings'} },
        
        { path:'promesas',component:PromesasComponent,data: {titulo:'Promesas'} },
        
        { path:'rxjs', component:RxjsComponent,data: {titulo:'RXJS'} },

        { path: 'perfil',component:PerfilComponent, data:{titulo:'Perfil de Usuario(a)'}},
      
        //Mantenimientos
        {path:'usuarios',component:UsuariosComponent,data:{titulo:'usuarios(a) de aplicacion '}},

        {path:'hospitales',component:HospitalesComponent,data:{titulo:'hospitales'}},

        {path:'medicos',component:MedicosComponent,data:{titulo:'medicos'}},

        {path:'medico/:id',component:MedicoComponent,data:{titulo:'medico'}},
       
      ]
   },
 

 ];

 @NgModule({

  imports:[ RouterModule.forChild(routes) ],

  exports:[RouterModule]
 })

 export class PagesRoutingModule{}

