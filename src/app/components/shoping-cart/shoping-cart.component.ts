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

  delete(id: string) {
    const idToDelete = this.products.findIndex((product: any) => {
      return product.id == id
    });

    console.log(idToDelete);

    this.products.splice(idToDelete, 1);

    const data = localStorage.getItem('CrearteData');

    const newShoping = JSON.parse(data as string);
    newShoping.shopingCart.products = this.products;

    localStorage.setItem('CrearteData',JSON.stringify(newShoping));
    window.dispatchEvent(new Event('storage'));

  }

}


