import { NgModule } from '@angular/core';
//
import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes=[
  // definicion de las rutas hijas 
  { 
   path:'', 
   component:PagesComponent,
   children:[
      //rutas protegidas 
       { path:'dashboard', component:DashboardComponent},

       { path:'grafica1', component:Grafica1Component},

       { path:'progress', component:ProgressComponent},
      
       { path:'', redirectTo:'/dashboard',pathMatch:'full' }
     ]
  },

//rutas publicas 
{path:'register', component:RegisterComponent},

{path:'login', component:LoginComponent },

{ path:'**', component:NopagefoundComponent}

];


@NgModule({
  declarations: [],

  imports:[
    RouterModule.forRoot(routes)
  ],

  exports:[RouterModule]
})


export class AppRoutingModule { }
