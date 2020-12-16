import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
//
import { Subscription } from 'rxjs';
//
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales:Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando:boolean = true;
  //
  private imgSubs:Subscription;

  constructor(private hospitalServices:HospitalService, private modalService:ModalImagenService,
               private BuscarService:BusquedasService
    ) { }

  ngOnInit(): void {
   this.cargarHsopitales();

   this.imgSubs = this.modalService.nuevaimagen.pipe(
    delay(100)
  ).subscribe(img =>{
   this.cargarHsopitales();
  });
  }
  ngOnDestroy():void{
    this.imgSubs.unsubscribe();
  }

  cargarHsopitales(){
    this.cargando=true;
    this.hospitalServices.cargarHospitales().subscribe(hospitales=>{
      console.log(hospitales);
      this.cargando       = false;
      this.hospitales     = hospitales;
      this.hospitalesTemp = hospitales;
    });
  }

  guardarCambios(hospital:Hospital){
    this.hospitalServices.ActualizarHospitales(hospital._id,hospital.nombre).subscribe(resp=>{
      Swal.fire(
        'Guardado!',
        `El ,${hospital.nombre} se ha Actualizado con Exito.`,
        'success'
      )
    });
  }

  Eliminar(hospital:Hospital){
    this.hospitalServices.EliminarHospitales(hospital._id).subscribe(resp=>{
      Swal.fire(
        'Eliminado!',
        `El ,${hospital.nombre} se ha Eliminado con Exito.`,
        'success'
      )
      this.cargarHsopitales();
    });
  }

  //promesa
  async abrirSweetAlert() {
    const { value = " " } = await Swal.fire({
      title:'Crear Hospital',
      text:'Ingrese el Nombre del nuevo Hospital',
      input: 'text',
      inputPlaceholder:'Nombre del Hospital',
      showCancelButton:true
 
    }); 
     if(value.trim().length > 0){
       this.hospitalServices.CrearHospitales(value).subscribe((resp:any) =>{
        console.log(resp);
        this.hospitales.push(resp.hospital);
       });
      }
      else{

      }
  }

  abrirModal(hospital:Hospital){
   this.modalService.abrirModal('hospitales',hospital._id,hospital.img);

  }

  buscar(termino:string){
    if(termino.length === 0 ){
      return this.hospitales = this.hospitalesTemp;
    }
   
      this.BuscarService.Buscar('hospitales',termino).subscribe( (resul:Hospital[]) =>{
        // se debe apliacar el casteo necesario porque se debe ser lo mas especifico posible,
        //para que typescript no de errores de ambiguedad.
       this.hospitales = resul;

      });
     }
      


}
