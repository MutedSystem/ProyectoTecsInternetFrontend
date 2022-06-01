import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  window = 'catalogue'

  setWindow(newWindow:any){
    this.window = newWindow;
    console.log(this.window);
  }
}
