import { Component, OnInit } from '@angular/core';
//
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//
import { UsuarioService } from '../../services/usuario.service';
//
import { Usuario } from '../../models/usuario.model';
//
import { FileUploadService } from '../../services/file-upload.service';
//
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  public perfilForm:FormGroup;
  public usuario:Usuario;
  public imagenSubir:File;
  public imgTemp: any;

  constructor(private FormBuilder:FormBuilder,private usuarioService:UsuarioService,
    private fileUpload:FileUploadService) {

    this.usuario = usuarioService.usuario;
   }

  ngOnInit(): void {
    this.perfilForm = this.FormBuilder.group({
     nombre:[this.usuario.nombre,Validators.required],
     email:[ this.usuario.email, [Validators.required,Validators.email]]
    });
  }
  actualizarPerfil(){
    this.usuarioService.ActualizarUsuario(this.perfilForm.value).subscribe(data=>{
      const {nombre,email} = this.perfilForm.value
     this.usuario.nombre= nombre;
     this.usuario.email = email;
     
     Swal.fire({
       title:'Guardado',
       text:'Cambios Guardados con Exito',
       icon:'success',
       showClass:{ popup: 'animate__animated animate__fadeInTopLeft' },
     });

    },(err) => { 
      Swal.fire({
        title:'Error',
        text: err.error.msg,
        icon:'error',
      });

    }
    );
  }
  cambiarImagen(file:File){
  this.imagenSubir = file;

  if(!file) { 
    return this.imgTemp = null;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = () => {
    this.imgTemp = reader.result;
    console.log(reader.result);
  }
  }
  SubirImagen(){
    this.fileUpload.ActualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid)
    .then(img => { 
      this.usuario.img = img;
      //
      Swal.fire({
        title:'Guardado',
        text:'Imagen Actualizada con Exito',
        icon:'success',
      }); 
    }). catch(err=>{
     console.log(err);
     Swal.fire({
      title:'Error',
      text: 'No se pudo Actualizar la imagen ',
      icon:'error',
    });

    });
   
  }

}
