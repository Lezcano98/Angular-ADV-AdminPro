import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
//

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir:File;
  public imgTemp: any = null;
  
  constructor(public modalService:ModalImagenService, private fileUpload:FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp= null;
   this.modalService.cerrarModal();
  
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

      const id = this.modalService.id;
      const tipo = this.modalService.tipo

      this.fileUpload.ActualizarFoto(this.imagenSubir,tipo,id)
      .then(img => { 
        //
        this.cerrarModal();
        Swal.fire({
          title:'Guardado',
          text:'Imagen Actualizada con Exito',
          icon:'success',
        }); 
        this.modalService.nuevaimagen.emit(img);
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
