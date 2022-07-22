import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  window = 'catalogue'
  title ='';
  id='';

  setWindow(newWindow:any){
    this.window = newWindow;
    let cantidadDatos = newWindow.split('/');
    if(cantidadDatos.length > 1){
      this.id = newWindow.split('/')[1];
      this.window = 'product';
    }else{
      this.window = newWindow;
    }
  }
}
