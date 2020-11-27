import { Injectable, NgZone } from '@angular/core';
//
import {HttpClient} from '@angular/common/http';
//interface
import { RegisterForm } from '../interfaces/register-form.interface';
//
import { environment } from '../../environments/environment';
//
import { LoginForm } from '../interfaces/login-form.interface';
//
import {tap,map, catchError} from 'rxjs/operators';
//
import { Observable,of } from 'rxjs';
//
import { Usuario } from '../models/usuario.model';
//interface
import { cargarUsuario } from '../interfaces/cargar-usuarios-interface';


const url = environment.base_url;
declare const gapi:any; 

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  
  public auth2   : any;
  public usuario : Usuario;

  constructor(private http:HttpClient , private ngzone:NgZone) { 
    this.googleInit();
  }

  get Token():string{

    return localStorage.getItem('token') || '';

  }

  get uid():string{
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers:{
        'x-token':this.Token
      }
    }
  }

  googleInit(){

    return new Promise((resolve,reject) =>{
      gapi.load('auth2',() => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '812207397503-ronmj4b8ltbt4vi8v1ae1evcimmf907e.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        //
        resolve();
      });

    });
   
     
  }

  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then(()=>{

      this.ngzone.run(() => {} )
    });
  }


 validarToken():Observable<boolean> {
 
   return this.http.get(`${url}/login/renew`,this.headers)
   .pipe(
   map((resp:any)=>{
     //img='' lo hago asi por si la persona que se logea no tiene imagen poder asignarle un lavor por defecto

     const{ email,google,nombre,role,img ='',uid } = resp.usuario;

     this.usuario = new Usuario(nombre,email,'',img,google,role,uid);

    localStorage.setItem('token', resp.token);
    
    return true;
   }),
   catchError(error => of(false))
 
   );

 }
  crearUsuario(formData:RegisterForm){

   return this.http.post(`${url}/usuarios`,formData)
   .pipe( 
    tap( (resp:any) =>{
      localStorage.setItem('token', resp.token);
    })
    );
  }
  ActualizarUsuario(data: {email:string, nombre:string ,role:string}){

    data={
      ...data,
      role:this.usuario.role
    }
   return this.http.put(`${url}/usuarios/${this.uid}`,data,this.headers);
}

  loginUsuario(formData:LoginForm){

    return this.http.post(`${url}/login`,formData)
    .pipe( 
      tap( (resp:any) =>{
        localStorage.setItem('token', resp.token);
      })
      );
 
   }

   loginGoogle(token){

    return this.http.post(`${url}/login/google`,{token})
    .pipe( 
      tap( (resp:any) =>{
        localStorage.setItem('token', resp.token);
      })
      );
 
   }

   cargarUsuarios(desde:number = 0 ){
     const base_url =`${url}/usuarios?desde=${desde}`;
    return this.http.get<cargarUsuario>(base_url,this.headers).pipe(
      map( (resp) => {
      const usuarios= resp.usuarios.map(
        user=> new Usuario(user.nombre,user.email,'',user.img,user.google,user.role,user.uid))
       return {
         total: resp.total,
         usuarios
       };

      })
    );
   }

   eliminarUsuario(usuario:Usuario){
     
    const base_url = `${url}/usuarios/${usuario.uid}`;

    return this.http.delete(base_url,this.headers);
   }

   ModificarUsuario(usuario:Usuario){

    return this.http.put(`${url}/usuarios/${usuario.uid}`,usuario,this.headers);
 }
   


}
