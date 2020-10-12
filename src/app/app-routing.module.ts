import { NgModule } from '@angular/core';
//
import { PagesRoutingModule } from './pages/pages.routing';
//
import { AuthRoutingModule } from './auth/auth.routing';
//
import {RouterModule, Routes} from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
//

const routes: Routes=[
 // todas la rutas del path:dashboard se encuentran en (pages.routing.ts) PagesRoutingModule
 // todas la rutas del auth:register y login estan en (auth.routing.ts) AuthRoutingModule
 { path:'', redirectTo:'/dashboard',pathMatch:'full' },
 
 { path:'**', component:NopagefoundComponent}

];


@NgModule({
  imports:[
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],

  exports:[RouterModule]
})


export class AppRoutingModule { }
