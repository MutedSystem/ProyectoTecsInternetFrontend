import { ErrorMessageComponent } from './../common/error-message/error-message.component';
import { SuccessMessageComponent } from './../common/success-message/success-message.component';
import { LoadingComponent } from './../common/loading/loading.component';
import { MatDialog } from '@angular/material/dialog';
import { BuyService } from './../../services/buy.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit {

  products: any = null;
  total: any = null;

  constructor(private buyService: BuyService, private datePipe: DatePipe, private dialog: MatDialog) { }

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

    localStorage.setItem('CrearteData', JSON.stringify(newShoping));
    window.dispatchEvent(new Event('storage'));

  }

  buy() {
    this.dialog.open(LoadingComponent, {
      width: '250px',
      height: '250px',
      disableClose: true
    });

    let dateNow = Date.now();
    let date = this.datePipe.transform(dateNow, "yyyy-MM-dd hh:mm:ss");

    if (this.products && this.total) {
      this.buyService.makeBuy({
        products: this.products,
        date,
        quantityToPay: this.total
      })
        .subscribe((result) => {
          this.dialog.closeAll();
          this.dialog.open(SuccessMessageComponent, {
            width: '250px',
            data: {
              title: 'Compra realizada con exito',
              message: 'Muy pronto se pondrán en contacto contigo para definir los detalles de la entrega'
            }
          });
          let data = localStorage.getItem('CrearteData');

          let jsonData = JSON.parse(data as string);
          console.log(jsonData);
          
          if (data) {
            (jsonData as any).shopingCart.total = 0;
            (jsonData as any).shopingCart.products = [];
            this.total = 0;
            this.products = [];
          }

          localStorage.setItem('CrearteData', JSON.stringify(jsonData));
          window.dispatchEvent(new Event('storage'));    

        }, (error) => {
          this.dialog.closeAll();
          this.dialog.open(ErrorMessageComponent, {
            width: '250px',
            data: {
              title: 'Algo salió mal, intentalo más tarde',
              message: 'Algo salió mal, intentalo más tarde'
            }
          });
        });
    }
  }

}


