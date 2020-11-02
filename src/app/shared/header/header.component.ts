import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private usuariosService:UsuarioService, private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.usuariosService.logout();
    this.router.navigateByUrl('/login');
  }

}
