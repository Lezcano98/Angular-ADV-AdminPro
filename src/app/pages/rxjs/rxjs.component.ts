import { Component, OnDestroy } from '@angular/core';
import { Observable,interval, Subscription } from 'rxjs';

import {retry,take,map,filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})

export class RxjsComponent implements OnDestroy{

  public intervaloSub:Subscription;

  constructor() { 
    // this.retornaobservable().pipe(
    //   retry(1)
    // ).subscribe( 
    //   valor => console.log('subs:',valor),
    //   error => console.warn('Error',error),
    //   () => console.info('obs terminado')
      
    //   );
   this.intervaloSub = this.retornaIntervalo().subscribe(data=> console.log(data));


  }
retornaIntervalo(){
  const intervalo$=interval(1000)
  .pipe(
    map(valor =>  valor + 1 ),
    filter(valor =>(valor % 2 ===0 ? true : false)),
    take(10)
  );

  return intervalo$;
}
  retornaobservable():Observable<number>{
    let i = -1;
    const obs$= new Observable<number>(observer =>{

      
     const intervalo = setInterval(()=>{
      
      i++;
      observer.next(i);

      if(i===4){
       
        clearInterval(intervalo);
        observer.complete();

      }
      if(i===2){
        observer.error('i llego al valor 2');
      }

     },1000)

    });

    return obs$;
  }


  ngOnDestroy(){
    this.intervaloSub.unsubscribe();
  }
}
