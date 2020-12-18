import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;
  constructor(private usuariosService:UsuarioService, private router:Router) {

 
   }

  ngOnInit(): void {
    this.usuario = this.usuariosService.usuario;
  }

  logout(){
    this.usuariosService.logout();
    this.router.navigateByUrl('/login');
  }

  buscar(termino:string){
    if(termino.trim().length === 0){
      return;
    }
   this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}
