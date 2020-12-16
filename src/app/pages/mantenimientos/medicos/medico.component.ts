import { Component, OnInit } from '@angular/core';
//
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//
import { Hospital } from 'src/app/models/hospital.model';
//
import { Medicos } from 'src/app/models/medicos.model';
import Swal from 'sweetalert2';
//
import { HospitalService } from '../../../services/hospital.service';
//
import { MedicoService } from '../../../services/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm:FormGroup;
  public hospitales:Hospital[] = [];

  public hospitalSelecionado :Hospital;
  public medicoSelecionado:Medicos;



  constructor(private fb :FormBuilder, private hospitalService:HospitalService,
             private medicoService:MedicoService, private router:Router,
             private activateRouter:ActivatedRoute
      ) { }  

  ngOnInit(): void {
    this.activateRouter.params.subscribe(({ id }) =>{
     this.cargarMedicoById(id);
     });
    //===================================
  this.medicoForm = this.fb.group({
   nombre:['', Validators.required],
   hospital:['',Validators.required]
  });
  this.cargarHospitales();
  //creamos un observable que este al pendiente del hospital que se ha seleccionado
  //utilizo el valuechanged
  this.medicoForm.get('hospital').valueChanges.subscribe(hospitalid =>{

   this.hospitalSelecionado = this.hospitales.find(h => h._id === hospitalid);
  });
  }

  cargarMedicoById(id:string){
    if(id ==='nuevo'){
     return;
    }

     this.medicoService.GetMedicoById(id)
     .pipe(
       delay(100)
     )
     .subscribe (medico =>
    {
        const {nombre,hospital:{_id}} = medico;
        this.medicoSelecionado = medico;
        //para establecer los valores al formulario.
        this.medicoForm.setValue( {nombre,hospital:_id} );

   // nota lo hago difernete al video de la clase 231 puesto que El problema es que no me
   // esta retornando una respuesta valida el server, 
   // sino como error, por lo tanto, se ejecuta en la captura del error
  },error => {
    return this.router.navigateByUrl(`/dashboard/medicos`);
  });
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales().subscribe( ( hospitales:Hospital[] ) =>
    {

      this.hospitales = hospitales;
    });
  }

  guardarMedico(){

    const {nombre}=this.medicoForm.value;
    //===================
    if(this.medicoSelecionado){
     //actualizo
     const data={
       ...this.medicoForm.value,
       _id:this.medicoSelecionado._id
     }
     this.medicoService.actualizarMedico(data).subscribe( resp=>{
      Swal.fire('Actualizado',`${nombre},Actualizado correctamente`, 'success');
     });
    }
    else{
      //crear.
   
      this.medicoService.crerMedico(this.medicoForm.value).subscribe((data:any)=>{
       console.log(data);
  
       Swal.fire('Creado',`${nombre},Creado correctamente`, 'success');
  
       this.router.navigateByUrl(`dashboard/medico/${data.medicos._id}`);
      });
    }
   
  }

}
