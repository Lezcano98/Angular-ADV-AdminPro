import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{
 //para renombrar variables se hace asi @Input('valor') progreso:number= 25, valor es el mismo nombre 
 // que debe tener lo que me envia el padre
  @Input('valor') progreso:number= 25;

  @Input() btnclase:string = 'btn-primary';
   //para que el padre escuche los cambios 
  @Output() valorsalida: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor:number){
   if(this.progreso >=100 && valor >=0 ){

    this.valorsalida.emit(100);
    return this.progreso=100;
  
   }
   else if( this.progreso<=0 && valor <=0 ){

    this.valorsalida.emit(0);
    return this.progreso=0;
  
   }
   this.valorsalida.emit(this.progreso + valor);

   this.progreso = this.progreso + valor;
  }
  onChange(nuevoValor:number){
   if(nuevoValor>=100){
    this.progreso=100;
   }
   else if(nuevoValor<=0){
    this.progreso=0;
   }
   else{
     this.progreso = nuevoValor;
   }
   
   this.valorsalida.emit(this.progreso);

  }

  ngOnInit(){
    this.btnclase=`btn ${this.btnclase}`;
  }
}
