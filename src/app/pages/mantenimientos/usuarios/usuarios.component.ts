import { Component, OnInit, OnDestroy } from '@angular/core';
//
import { Usuario } from '../../../models/usuario.model';
//
import { UsuarioService } from '../../../services/usuario.service';
//
import { BusquedasService } from '../../../services/busquedas.service';
//
import Swal from 'sweetalert2';
//
import { ModalImagenService } from '../../../services/modal-imagen.service';
//
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit,OnDestroy {
  public totalUsuarios:number = 0;
  public usuarios:Usuario[] = [];
  public usuariosTemp:Usuario[] = [];
  public desde:number=0;
   public cargando:boolean = true;
   //
   public imgSubs:Subscription;


  constructor(private usuarioService:UsuarioService, private BuscarService:BusquedasService,
              private modalservice:ModalImagenService) { }

  ngOnInit(): void {
   this.cargarUsuarios();

  this.imgSubs = this.modalservice.nuevaimagen.pipe(
     delay(100)
   ).subscribe(img=>{
    this.cargarUsuarios();
   });
 
  }

  ngOnDestroy():void{
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios(){
    this.cargando= true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe(( {total,usuarios} ) => {
      this.totalUsuarios=total;
      if(usuarios.length !== 0){
       this.usuarios=usuarios
       this.usuariosTemp=usuarios;
      }
      this.cargando = false;
    });
  }

  cambiarPagina(valor:number){
this.desde += valor;
 if(this.desde < 0 ){
this.desde = 0
}
else if(this.desde > this.totalUsuarios){
this.desde -= valor;
}
this.cargarUsuarios();
  }

  buscar(termino:string){
 if(termino.length === 0 ){
   return this.usuarios = this.usuariosTemp;
 }

   this.BuscarService.Buscar('usuarios',termino).subscribe( resultados=>{
    this.usuarios= resultados;
   })
  }
   
  eliminarUsuario(usuario:Usuario){

    if(usuario.uid === this.usuarioService.usuario.uid ){
      return Swal.fire('Error','No puede Eliminarse asi mismo','error');
    }
    Swal.fire({
      title: 'Esta Seguro(a)?',
      text: `Desea Eliminar Este Usuario(a)! ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario).subscribe( resp=> {
          Swal.fire(
            'Eliminado!',
            `El usuario(a),${usuario.nombre} se ha eliminado con exito.`,
            'success'
          )
         this.cargarUsuarios();
        });
        
      }
      
    });
   
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.ModificarUsuario(usuario).subscribe(resp=>{
     console.log(resp);
    });
  }

  abrirModal(usuario:Usuario){
    this.modalservice.abrirModal('usuarios',usuario.uid,usuario.img);
  }


}
