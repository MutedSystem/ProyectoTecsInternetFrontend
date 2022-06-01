import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() window = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  setWindow(windowName:string){    
    this.window.emit(windowName);
  }

}
