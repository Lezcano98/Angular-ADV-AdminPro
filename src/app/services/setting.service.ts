import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
     // de esta forma hago que el cambio de tema sea persistente y no se pierda el refrescar la pagina.
     const url = localStorage.getItem('theme') || './assets/css/colors/blue.css';
     this.linkTheme.setAttribute('href',url);   
   }

   changeTeme(teme:string){
    const url= `./assets/css/colors/${teme}.css`;
    // para poder cambiar el tema osea cambiar la direccion del url para que cambie le color,
    //todo esto es propio de vanilla jascript le digo que en la propedad href coloque lo que tenga url 
    this.linkTheme.setAttribute('href',url);
    //
    localStorage.setItem('theme',url);
    //
    this.checkCurrentTheme();
  }



  
  checkCurrentTheme(){
    // le doy el tipado puesto que estamos usando typescript
    const link = document.querySelectorAll('.selector');
   
    link.forEach(elemento => {

     elemento.classList.remove('working');

     const btntheme = elemento.getAttribute('data-theme');
     const btnThmeUrl=`./assets/css/colors/${btntheme}.css`;
     const currenTheme= this.linkTheme.getAttribute('href');

     if(btnThmeUrl === currenTheme){
      
      elemento.classList.add('working');

     }

    });
  }
}
