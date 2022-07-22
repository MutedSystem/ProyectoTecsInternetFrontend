import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {

    let url = environment.URL_DOMINIO + '/products';

    return this.http.get(url);
  }

  getProduct(id: string) {

    let url = environment.URL_DOMINIO + '/products/' + id;

    return this.http.get(url);
  }

  customProduct(images: File[], data: any) {

    let url = environment.URL_DOMINIO + '/products/create';

    console.log(images);


    let dataToSend = new FormData();
    Array.from(images).forEach((image) => {
      dataToSend.append("imagesToUpload", image, image.name);
    })

    dataToSend.append('name', data.name);
    dataToSend.append('description', data.description);
    dataToSend.append('price', data.price);
    dataToSend.append('state', 'private');

    return this.http.post(url, dataToSend);

  }

}
