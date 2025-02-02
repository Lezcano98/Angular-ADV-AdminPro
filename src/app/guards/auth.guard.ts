import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanLoad {

  constructor(private usuarioService:UsuarioService,private router:Router ){}  

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     return this.usuarioService.validarToken().pipe(

      tap(estaAutenticado => {
       if(!estaAutenticado){
        this.router.navigateByUrl('/login');
       }
      })
     );
  }
  
  
  canActivate(

    // con este guard me encargo de tener a los usarios activos simpre autenticados 
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
     return this.usuarioService.validarToken().pipe(

      tap(estaAutenticado => {
       if(!estaAutenticado){
        this.router.navigateByUrl('/login');
       }
      })
     );
  }
  
}
