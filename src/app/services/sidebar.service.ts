import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[]=[
    {
      titulo:'Principal',
      icono:'mdi mdi-gauge',
      submenu:[
        {titulo:'Dashboard',url:'/'},
        {titulo:'ProgressBar',url:'progress'},
        {titulo:'Grafica1',url:'grafica1'},
        {titulo:'Rxjs',url:'rxjs'},
        {titulo:'Promesas',url:'promesas'},
        
      ]
    },


    {
      titulo:'Mantenimientos',
      icono:'mdi mdi-folder-lock-open',
      submenu:[
        {titulo:'usuarios',url:'usuarios'},
        {titulo:'Hospitales',url:'hospitales'},
        {titulo:'Medicos',url:'medicos'},
        
      ]
    }
  ];


  constructor() { }
}
