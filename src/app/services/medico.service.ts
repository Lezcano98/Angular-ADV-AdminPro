import { Injectable } from '@angular/core';
//
import { environment } from '../../environments/environment';
//
import { HttpClient } from '@angular/common/http';
//
import { Medicos } from '../models/medicos.model';
//
import { map } from 'rxjs/operators';
///
const base_url=environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http:HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }
  
  get headers(){
    return{
      headers:{
        'x-token':this.token
      }
    }
  }

  cargarMedicos(){
    const url =`${base_url}/medicos`;
   return this.http.get(url,this.headers).pipe(
     map((resp:{ ok:boolean,medicos:Medicos[] })=>{
       return resp.medicos;
     })
   );
  }
  GetMedicoById( id:string){
    const url=`${base_url}/medicos/${id}`;
    return this.http.get(url,this.headers).pipe(

      map((resp:{ok:boolean,medico:Medicos}) => resp.medico)
    );
  }
  //
  crerMedico(medico:{nombre:string, hospital:string}){
    const url =`${base_url}/medicos`;
    return this.http.post(url,medico,this.headers);
  }
  //
  actualizarMedico(medicos:Medicos){

   const url =`${base_url}/medicos/${medicos._id}`;

   return this.http.put(url,medicos,this.headers);
  }
  //
  borrarMedico(medicos:Medicos){
    const url =`${base_url}/medicos/${medicos._id}`;

    return this.http.delete(url,this.headers);

  }


}
