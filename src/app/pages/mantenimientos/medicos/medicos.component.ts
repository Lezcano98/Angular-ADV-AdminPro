import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medicos } from 'src/app/models/medicos.model';
import { MedicoService } from '../../../services/medico.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
//
import { Subscription } from 'rxjs';
//
import { delay } from 'rxjs/operators';
//
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy{

  public medicos:Medicos[] = [];
  public medicosTemp:Medicos[] = [];
  public cargando:boolean = true;
  //
  private imgSub:Subscription;

  constructor(private medicosService:MedicoService,private Buscar:BusquedasService,
              private modalService:ModalImagenService 
         ) { }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSub = this.modalService.nuevaimagen.pipe(
      delay(100)
    ).subscribe(img =>{
     this.cargarMedicos();
    });
  }

  ngOnDestroy():void{
    this.imgSub.unsubscribe();
  }
  
  cargarMedicos(){
    this.cargando=true;
    this.medicosService.cargarMedicos().subscribe(medicos=>{
      this.cargando     = false;
      this.medicos      = medicos;
      this.medicosTemp  = medicos;
    });
  }
  BorrarMedicos(medico:Medicos){
    Swal.fire({
      title: 'Esta Seguro(a)?',
      text: `Desea Eliminar Este Medico! ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si,Eliminar!'
    }).then((result) => {
      if (result.value) {
        this.medicosService.borrarMedico(medico).subscribe( (resp:any)=> {
          Swal.fire(
            'Eliminado!',
            `${medico.nombre} se ha eliminado con exito.`,
            'success'
          )
          // a diferencia del push con el pop() remuevo del arreglo lo que elimino
          this.medicos.pop();
        });
        
      }
      
    });
  }

  BuscarMedico(termino:string){

    if(termino.length === 0 ){ 

      return this.medicos = this.medicosTemp;
    }
   
   this.Buscar.Buscar('medicos',termino).subscribe((resultado:Medicos[])=>{
    this.medicos = resultado;
   });
  }

  
  abrirModal(medicos:Medicos){
    this.modalService.abrirModal('medicos',medicos._id,medicos.img);
 
   }
}
