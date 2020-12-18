import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Medicos } from '../../models/medicos.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {

  public usuarios:    Usuario[]= [];
  public medicos:     Medicos[]= [];
  public hospitales:  Hospital[]=[];

  constructor( private activateRoute:ActivatedRoute,private busquedasService:BusquedasService) { }


  ngOnInit(): void {

    this.activateRoute.params.subscribe( ({ termino }) =>{

       this.busquedasService.BusquedaGlobal(termino).subscribe( (resp:any) => {
        console.log(resp);
        this.usuarios   = resp.usuarios;
        this.medicos    = resp.medicos;
        this.hospitales = resp.hospital;


       });
    });
  }


}
