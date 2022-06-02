import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {

  products: any = null;
  total: any = null;

  constructor() { }

  ngOnInit(): void {

    let data = localStorage.getItem('CrearteData');

    if (data) {
      this.total = JSON.parse(data).shopingCart.total;
      this.products = JSON.parse(data).shopingCart.products;
    }
  }

}
