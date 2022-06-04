import { DatePipe } from '@angular/common';
import { BuyService } from './../../services/buy.service';
import { LoadingComponent } from './../common/loading/loading.component';
import { SuccessMessageComponent } from './../common/success-message/success-message.component';
import { ErrorMessageComponent } from './../common/error-message/error-message.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css']
})
export class CustomComponent implements OnInit {

  files: any = null;
  descriptionFormControl = new FormControl('', Validators.required);

  constructor(private productsServive: ProductService, private dialog: MatDialog, private productsService: ProductService, private buyService: BuyService, private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  loadFiles(event: any) {
    this.files = event.target.files;
  }

  createProduct() {
    if (JSON.parse(localStorage.getItem('CrearteData') as string) != null) {
      if (this.files != null) {
        this.productsServive.customProduct(this.files, {
          name: 'Personalizado',
          description: this.descriptionFormControl.value,
          price: 10000
        }).subscribe((response) => {
          let idProducto = (response as any).id[0].idProducto;
          let foto = JSON.parse((response as any).id[0].fotos).photosUrl[0];
          let shopingCart = JSON.parse(localStorage.getItem('CrearteData') as string).shopingCart.products;
          let total = JSON.parse(localStorage.getItem('CrearteData') as string).shopingCart.total;
          let idProduct = shopingCart.findIndex((product: any) => {
            return product.id == idProducto
          });

          if (idProduct != -1) {
            this.dialog.open(ErrorMessageComponent, {
              width: '250px',
              data: {
                title: 'Este producto ya existe en el carrito',
                message: 'Revisa tu carrito de compras porque este producto ya lo tienes en el'
              }
            });
          } else {
            shopingCart.push({
              id: idProducto,
              name: 'Personalizado',
              price: 1000,
              quantity: 1,
              photoUrl: foto
            });

            let shoppingCartToUpdate = JSON.parse(localStorage.getItem('CrearteData') as string);
            shoppingCartToUpdate.shopingCart.products = shopingCart;

            total += 1000;

            shoppingCartToUpdate.shopingCart.total = total;

            localStorage.setItem('CrearteData', JSON.stringify(shoppingCartToUpdate));
            window.dispatchEvent(new Event('storage'));

            this.dialog.open(SuccessMessageComponent, {
              width: '250px',
              data: {
                title: 'Has añadido este producto a tu carrito',
                message: 'Ya tienes este producto en tu carrito, puedes revisar los detalles'
              }
            });

          }
        }, (error) => {
          console.error(error);
        });
      }
    } else {
      this.dialog.open(ErrorMessageComponent, {
        width: '250px',
        data: {
          title: 'Tienes que iniciar sesión',
          message: 'Tienes que iniciar sesión para poder añadir elementos al carrito'
        }
      });
    }
  }

  buy() {
    if (JSON.parse(localStorage.getItem('CrearteData') as string)!= null) {
      this.dialog.open(LoadingComponent, {
        width: '250px',
        height: '250px',
        disableClose: true
      });

      this.productsServive.customProduct(this.files, {
        name: 'Personalizado',
        description: this.descriptionFormControl.value,
        price: 10000
      }).subscribe((response) => {
        let idProducto = (response as any).id[0].idProducto;
        let dateNow = Date.now();
        let date = this.datePipe.transform(dateNow, "yyyy-MM-dd hh:mm:ss");

        this.buyService.makeBuy({
          products: [
            {
              id: idProducto,
              quantity: 1
            }
          ],
          date,
          quantityToPay: 10000
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
    }else {
      this.dialog.open(ErrorMessageComponent, {
        width: '250px',
        data: {
          title: 'Tienes que iniciar sesión',
          message: 'Tienes que iniciar sesión para poder comprar este producto'
        }
      });
    }


  }

}
