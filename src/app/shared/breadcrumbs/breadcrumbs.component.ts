import { Component, OnDestroy } from '@angular/core';
//
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
//
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo:string;
  public tituloSub$:Subscription;

  constructor(private router:Router) {

   this.tituloSub$= this.ArgumentosRutas()
   .subscribe(({titulo}) => {
    this.titulo=titulo;
    document.title=`AdminPro - ${titulo}`;
  
  });
  
  }

  ngOnDestroy(): void {

   this.tituloSub$.unsubscribe();
   
  }

   ArgumentosRutas(){
      return this.router.events.pipe(
      filter(evento=> evento instanceof ActivationEnd),
      filter((event:ActivationEnd)=>event.snapshot.firstChild === null ),
      map( (event:ActivationEnd) => event.snapshot.data)

    )
   }

}
