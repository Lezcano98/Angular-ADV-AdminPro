import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

public menu = [];

cargarMenu(){

this.menu = JSON.parse(localStorage.getItem('menu')) || [];

if(this.menu.length === 0){
  //si el por algun motivo el emnu falla aqui lo podemos redireccionar al login
}

}


  //=====LODEJO COMO REFERENCIA PARA FUTUROS PROYECTOS, ESTO ES LO QUE SE DEBE HACER EN EL BACKEND
  //====PARA REALIZAR EL MENU 
  // menu:any[]=[
  //   {
  //     titulo:'Principal',
  //     icono:'mdi mdi-gauge',
  //     submenu:[
  //       {titulo:'Dashboard',url:'/'},
  //       {titulo:'ProgressBar',url:'progress'},
  //       {titulo:'Grafica1',url:'grafica1'},
  //       {titulo:'Rxjs',url:'rxjs'},
  //       {titulo:'Promesas',url:'promesas'},
        
  //     ]
  //   },


  //   {
  //     titulo:'Mantenimientos',
  //     icono:'mdi mdi-folder-lock-open',
  //     submenu:[
  //       {titulo:'usuarios',url:'usuarios'},
  //       {titulo:'Hospitales',url:'hospitales'},
  //       {titulo:'Medicos',url:'medicos'},
  //     ]
  //   }
  // ];


  constructor() { }
}
