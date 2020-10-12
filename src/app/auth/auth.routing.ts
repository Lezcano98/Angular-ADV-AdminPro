// todo esto es mi sistema de rutas secundario, el cual exportare a mi sistema de rutas principal

import { Routes, RouterModule } from '@angular/router';
//
import {NgModule} from '@angular/core';
//
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
//


const routes: Routes = [
  
  //rutas publicas 
{path:'register', component:RegisterComponent},

{path:'login', component:LoginComponent },

 ];


  @NgModule({

    imports:[ RouterModule.forChild(routes) ],
  
    exports:[RouterModule]
   })
  
   export class AuthRoutingModule{}