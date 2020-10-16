import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then(usuarios =>{
      console.log(usuarios);
    });

  //   const promesa = new Promise((resolve,reject)=>{

  //     if(false){
  //       resolve('hola mundo');
  //     }
  //     else{
  //       reject(' algo salio mal ');
  //     }
    
  //   });

  //  // then cuando la promesa se resuelve, si necesito lo que esta dentro de la promesa lo pongo dentro de los 
  //  //parentesis
  //  promesa.then((mensaje)=>{

  //   console.log(mensaje);

  //  }).catch(error =>console.log('error en la promesa' + error) );

  //   console.log('fin del init ')
  }

  getUsuarios(){

    return new Promise(resolve=>{
      fetch('https://reqres.in/api/users?page=2')
      .then(data => data.json())
      .then(body => resolve(body.data));
    });
   
  }

}
