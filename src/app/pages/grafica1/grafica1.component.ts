import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1:string[] = ['Xbox series X', 'Play Station 5', 'Nintendo Switch'];

  public data1 = [
    [350, 450, 100]
  ];

}
