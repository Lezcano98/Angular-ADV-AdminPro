// todo esto es mi sistema de rutas secundario, el cual exportare a mi sistema de rutas principal

import { Routes, RouterModule } from '@angular/router';
//
import {NgModule} from '@angular/core';
//
import { PagesComponent } from './pages.component';
//
import { AuthGuard } from '../guards/auth.guard';


 const routes: Routes = [
   // definicion de las rutas hijas 
   { 
    path:'dashboard', 
    component:PagesComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard],
    loadChildren:()=>import('./child-routes.module').then(module => module.ChildRoutesModule)
   },
 

 ];

 @NgModule({

  imports:[ RouterModule.forChild(routes) ],

  exports:[RouterModule]
 })

 export class PagesRoutingModule{}

