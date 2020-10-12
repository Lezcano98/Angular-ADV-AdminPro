// todo esto es mi sistema de rutas secundario, el cual exportare a mi sistema de rutas principal

import { Routes, RouterModule } from '@angular/router';
//
import {NgModule} from '@angular/core';
//
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';



 const routes: Routes = [
   // definicion de las rutas hijas 
   { 
    path:'dashboard/', 
    component:PagesComponent,
    children:[
       //rutas protegidas 
        { path:'', component:DashboardComponent},
 
        { path:'grafica1', component:Grafica1Component},
 
        { path:'progress', component:ProgressComponent},
       
      ]
   },
 

 ];

 @NgModule({

  imports:[ RouterModule.forChild(routes) ],

  exports:[RouterModule]
 })

 export class PagesRoutingModule{}

