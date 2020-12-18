import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

 constructor(private usuarioService:UsuarioService,private router:Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {

   //return (this.usuarioService.role ==='Admin_Rol') ? true :false;
    
      //la instrunccion de arriba es un ternario(un if mas simplificado),cumple la misma funcio que esta abajo
      
        if(this.usuarioService.role === 'Admin_Rol' ){
          return true;
          }
          else{
         this.router.navigateByUrl('/dashboard');
           return false;
       }
    }
  
}
