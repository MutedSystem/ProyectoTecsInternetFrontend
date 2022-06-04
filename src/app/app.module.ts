import { BuyService } from './services/buy.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SinginComponent } from './components/singin/singin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './components/common/loading/loading.component';
import { SuccessMessageComponent } from './components/common/success-message/success-message.component';
import { ErrorMessageComponent } from './components/common/error-message/error-message.component';
import { ProductsBougthComponent } from './components/products-bougth/products-bougth.component';
import { ShopingCartComponent } from './components/shoping-cart/shoping-cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ProductComponent } from './components/product/product.component';
import { ProductReviewComponent } from './components/product-review/product-review.component';
import { CustomComponent } from './components/custom/custom.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SinginComponent,
    LoadingComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    ProductsBougthComponent,
    ShopingCartComponent,
    FooterComponent,
    CatalogueComponent,
    ProductComponent,
    ProductReviewComponent,
    CustomComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule
  ],
  providers: [
    AuthService,
    ProductService,
    BuyService,
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
