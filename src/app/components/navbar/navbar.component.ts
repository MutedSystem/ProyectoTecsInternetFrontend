import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() window = new EventEmitter<string>();

  name: any = null;
  productsOnShopingCart: any = null;

  constructor() { }

  ngOnInit(): void {

    let data = localStorage.getItem('CrearteData');

    console.log(JSON.stringify({
      name: "daniel",
      token: "",
      shopingCart: [
        {
          primerProducto: ""
        },
        {
          segundoProducto: ""
        }
      ]
    }));


    if (data) {
      this.name = JSON.parse(data).name;
      this.productsOnShopingCart = JSON.parse(data).shopingCart.length;
      console.log(JSON.parse(data).shopingCart.length);
    }
  }

  setWindow(windowName: string) {
    this.window.emit(windowName);
  }

  singout() {
    localStorage.clear();
    this.name = null;
    this.productsOnShopingCart = null;
    this.setWindow('catalogue');
  }

}
