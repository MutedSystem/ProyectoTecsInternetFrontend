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

    localStorage.setItem('CrearteData',JSON.stringify({
      name: "daniel",
      token: "",
      shopingCart: {
        products: [
          {
            name: "primer",
            price: 1000,
            quantity: 1,
            photoUrl: "https://www.dexerto.es/wp-content/uploads/sites/3/2022/02/20/yelan.jpg"
          },
          {
            name: "segundo",
            price: 1000,
            quantity: 3,
            photoUrl: "https://xboxplay.games/uploadStream/18601.jpg"
          }
        ],
        total: 10
      }
    }));

    let data = localStorage.getItem('CrearteData');

    if (data) {
      this.name = JSON.parse(data).name;
      this.productsOnShopingCart = JSON.parse(data).shopingCart.products.length;
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
