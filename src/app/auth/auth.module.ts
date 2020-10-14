import { NgModule } from '@angular/core';
//
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth.routing';
import { FormsModule } from '@angular/forms';
//
import { LoginComponent } from './login/login.component';
//
import { RegisterComponent } from './register/register.component';





@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],

  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ],

  exports:[
    LoginComponent,
    RegisterComponent,
  ]

})
export class AuthModule { }
