import { DatePipe } from '@angular/common';
import { BuyService } from './../../services/buy.service';
import { LoadingComponent } from './../common/loading/loading.component';
import { SuccessMessageComponent } from './../common/success-message/success-message.component';
import { ErrorMessageComponent } from './../common/error-message/error-message.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit {

  @Input() id: string = "";
  product: any = null;
  images = [];
  momentImageUrl = "";
  momentImageIndex = 0;
  quantity = 1;

  constructor(private productsService: ProductService, private dialog: MatDialog, private buyService: BuyService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.productsService.getProduct(this.id).subscribe((product) => {
      this.product = (product as any).product[0];
      console.log(JSON.parse(this.product.fotos).photosUrl);
      this.images = JSON.parse(this.product.fotos).photosUrl;
      this.momentImageUrl = this.images[0];
    }, (error) => {
      console.error(error);
    });

  }

  addProduct() {
    this.quantity++;
  }

  removeProduct() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  nextImage() {
    if (this.momentImageIndex < this.images.length) {
      this.momentImageIndex++;
      this.momentImageUrl = this.images[this.momentImageIndex];
    } else {
      this.momentImageIndex = 0;
      this.momentImageUrl = this.images[this.momentImageIndex];
    }
  }

  previusImage() {
    if (this.momentImageIndex > 0) {
      this.momentImageIndex--;
      this.momentImageUrl = this.images[this.momentImageIndex];
    } else {
      this.momentImageIndex = this.images.length - 1;
      this.momentImageUrl = this.images[this.momentImageIndex];
    }
  }

  addToShopingCart() {
    try {
      let shopingCart = JSON.parse(localStorage.getItem('CrearteData') as string).shopingCart.products;
      let total = JSON.parse(localStorage.getItem('CrearteData') as string).shopingCart.total;
      let idProduct = shopingCart.findIndex((product: any) => {
        return product.id == this.id
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
          id: this.id,
          name: this.product.nombre,
          price: this.product.precio,
          quantity: this.quantity,
          photoUrl: this.images[0]
        });

        let shoppingCartToUpdate = JSON.parse(localStorage.getItem('CrearteData') as string);
        shoppingCartToUpdate.shopingCart.products = shopingCart;

        total += this.product.precio * this.quantity;

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
    } catch (error) {
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
    if (JSON.parse(localStorage.getItem('CrearteData') as string) != null) {
      this.dialog.open(LoadingComponent, {
        width: '250px',
        height: '250px',
        disableClose: true
      });

      let dateNow = Date.now();
      let date = this.datePipe.transform(dateNow, "yyyy-MM-dd hh:mm:ss");

      this.buyService.makeBuy({
        products: [
          {
            id: this.id,
            quantity: this.quantity
          }
        ],
        date,
        quantityToPay: this.product.precio * this.quantity
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
    } else {
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
