import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  products : any = [];

  constructor(private productsService: ProductService) { }

  ngOnInit(): void {

    this.productsService.getProducts().subscribe((result) =>{
      this.products = (result as any).products;
    },(error) => {
      console.error(error);
    });

  }

}
