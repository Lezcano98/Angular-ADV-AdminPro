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
import { Observable,of } from 'rxjs';


const url = environment.base_url;
declare const gapi:any; 

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  
  public auth2:any;

  constructor(private http:HttpClient , private ngzone:NgZone) { 
    this.googleInit();
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
   const token = localStorage.getItem('token') ||'';
   
   return this.http.get(`${url}/login/renew`,{ 
     headers:{ 'x-token': token }
 }).pipe(
   tap((resp:any)=>{
    localStorage.setItem('token', resp.token);
   }),
   map(resp => true ),
   
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
}
