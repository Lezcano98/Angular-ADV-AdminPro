import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medicos } from '../models/medicos.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http:HttpClient) { }

  get Token():string { return localStorage.getItem('token') || ''; }

  get headers(){
    return {
      headers:{
        'x-token':this.Token
      }
    }
  }

  private TransformarUsuarios (resultado:any[]):Usuario[]   {
  return resultado.map(

    user => new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid)
  );
  }
// resultado es el nombre que asigne a la respuesta de mi BackEnd,
// es importante que este nombre se mantega parq ue los resultados de la busqueda sean precisos y evitar un error

  private TransformarHospitales (resultado:any[]):Hospital[]   {
    return resultado;
    }

    private TransformarMedicos (resultado:any[]):Medicos[]   {
      return resultado;
      }
    
  Buscar(tipo:'usuarios'|'medicos'|'hospitales', 
  termino:string)
  {
   const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

   return this.http.get<any[]>(url, this.headers).pipe(
     map((resp:any) => {

       switch (tipo) {
         case 'usuarios':
          return this.TransformarUsuarios(resp.resultado);
          
           case 'hospitales':
             return this.TransformarHospitales(resp.resultado);

             case 'medicos':
              return this.TransformarMedicos(resp.resultado);
       
         default:
           return[];
       }

     })
     );
  }


}
